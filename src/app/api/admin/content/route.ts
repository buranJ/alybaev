import { z } from 'zod';

import { adminEntries, contentSchemas } from '@/features/admin/model/content-registry';
import {
  AdminError,
  adminFailure,
  adminJson,
  assertSameOrigin,
  requireAdmin,
} from '@/features/admin/server/access';
import { commitFile, readContent } from '@/features/admin/server/github';

const updateSchema = z.object({
  name: z.string(),
  sha: z
    .string()
    .regex(/^[a-f0-9]{40,64}$/)
    .nullable(),
  data: z.record(z.string(), z.unknown()),
});

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const name = new URL(request.url).searchParams.get('name');
    const entry = adminEntries.find((entry) => entry.name === name);
    if (!entry) throw new AdminError('Раздел не найден.', 404);
    const file = await readContent(`content/${entry.name}.json`);
    return adminJson(file ?? { sha: null, data: entry.data });
  } catch (error) {
    return adminFailure(error);
  }
}

export async function PUT(request: Request) {
  try {
    assertSameOrigin(request);
    await requireAdmin();
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 250000)
      throw new AdminError('Слишком большой текст раздела.', 413);
    const update = updateSchema.safeParse(JSON.parse(raw));
    if (!update.success) throw new AdminError('Некорректные данные раздела.', 400);
    const entry = adminEntries.find((entry) => entry.name === update.data.name);
    const schema = contentSchemas[update.data.name];
    if (!entry || !schema) throw new AdminError('Раздел не найден.', 404);
    const parsed = schema.safeParse(update.data.data);
    if (!parsed.success)
      throw new AdminError(
        `Проверьте поля: ${parsed.error.issues.map((issue) => issue.path.join('.')).join(', ')}`,
        400,
      );
    const result = await commitFile(
      `content/${entry.name}.json`,
      Buffer.from(`${JSON.stringify(parsed.data, null, 2)}\n`),
      update.data.sha,
      `content: update ${entry.name}`,
    );
    return adminJson({ sha: result.content.sha, commit: result.commit.sha, data: parsed.data });
  } catch (error) {
    return adminFailure(error);
  }
}
