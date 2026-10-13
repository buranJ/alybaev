import { randomUUID } from 'node:crypto';
import sharp from 'sharp';

import {
  AdminError,
  adminFailure,
  adminJson,
  assertSameOrigin,
  requireAdmin,
} from '@/features/admin/server/access';
import { commitFile, github } from '@/features/admin/server/github';

const mediaPath = /^\/images\/(?!.*\.\.\/)[^?#\\]+\.(?:jpg|jpeg|png|webp|avif|svg)$/i;

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const path = new URL(request.url).searchParams.get('path');
    if (path) {
      if (!mediaPath.test(path)) throw new AdminError('Некорректный путь.', 400);
      const response = await github(
        `/contents/public${path.split('/').map(encodeURIComponent).join('/')}?ref=main`,
        { headers: { Accept: 'application/vnd.github.raw+json' } },
      );
      if (!response.ok) throw new AdminError('Изображение не найдено.', 404);
      const extension = path.split('.').at(-1)?.toLowerCase();
      const type =
        extension === 'svg'
          ? 'image/svg+xml'
          : extension === 'jpg'
            ? 'image/jpeg'
            : `image/${extension}`;
      return new Response(await response.arrayBuffer(), {
        headers: {
          'Content-Type': type,
          'Cache-Control': 'private, max-age=300',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }
    const response = await github('/git/trees/main?recursive=1');
    if (!response.ok) throw new AdminError('Не удалось загрузить медиатеку.', 502);
    const tree = (await response.json()) as { tree: { path: string; type: string }[] };
    const items = tree.tree
      .filter((item) => item.type === 'blob' && mediaPath.test(item.path.replace(/^public/, '')))
      .map((item) => ({
        path: item.path.replace(/^public/, ''),
        name: item.path.split('/').at(-1),
      }));
    return adminJson({ items });
  } catch (error) {
    return adminFailure(error);
  }
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    await requireAdmin();
    if (Number(request.headers.get('content-length')) > 6000000)
      throw new AdminError('Максимальный размер фотографии — 5 МБ.', 413);
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File) || !file.size || file.size > 5000000)
      throw new AdminError('Выберите фотографию до 5 МБ.', 400);
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type))
      throw new AdminError('Поддерживаются JPG, PNG, WebP и AVIF.', 400);
    let optimized: Buffer;
    try {
      optimized = await sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 40000000 })
        .rotate()
        .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
    } catch {
      throw new AdminError('Не удалось открыть изображение. Проверьте формат файла.', 400);
    }
    const path = `/images/uploads/${Date.now()}-${randomUUID().slice(0, 8)}.webp`;
    await commitFile(
      `public${path}`,
      optimized,
      null,
      'content: upload optimized photo [skip netlify]',
    );
    return adminJson({ path, name: file.name });
  } catch (error) {
    return adminFailure(error);
  }
}
