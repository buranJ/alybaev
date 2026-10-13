// @vitest-environment node
import sharp from 'sharp';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));
const mocks = vi.hoisted(() => ({ requireAdmin: vi.fn(), commitFile: vi.fn() }));
vi.mock('@/features/admin/server/access', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/features/admin/server/access')>()),
  requireAdmin: mocks.requireAdmin,
}));
vi.mock('@/features/admin/server/github', () => ({
  commitFile: mocks.commitFile,
  github: vi.fn(),
}));

import { AdminError } from '@/features/admin/server/access';
import { POST } from './route';

function upload(file: File) {
  const form = new FormData();
  form.append('file', file);
  return new Request('https://alybaev.netlify.app/api/admin/media', {
    method: 'POST',
    headers: { Origin: 'https://alybaev.netlify.app' },
    body: form,
  });
}

describe('photo upload', () => {
  beforeEach(() => {
    mocks.requireAdmin.mockResolvedValue({ email: 'doctor@example.com' });
    mocks.commitFile.mockClear();
    mocks.commitFile.mockResolvedValue({});
  });

  it('denies an unauthenticated upload before decoding or storing a file', async () => {
    mocks.requireAdmin.mockRejectedValue(new AdminError('Войдите', 401));
    const response = await POST(
      upload(new File(['not an image'], 'photo.jpg', { type: 'image/jpeg' })),
    );
    expect(response.status).toBe(401);
    expect(mocks.commitFile).not.toHaveBeenCalled();
  });

  it('rejects executable SVG uploads', async () => {
    const response = await POST(
      upload(new File(['<svg onload="alert(1)"/>'], 'photo.svg', { type: 'image/svg+xml' })),
    );
    expect(response.status).toBe(400);
    expect(mocks.commitFile).not.toHaveBeenCalled();
  });

  it('optimizes valid photos, removes metadata and assigns a server-generated filename', async () => {
    const image = await sharp({
      create: { width: 2600, height: 2200, channels: 3, background: '#dae6df' },
    })
      .withMetadata()
      .jpeg()
      .toBuffer();
    const response = await POST(
      upload(new File([new Uint8Array(image)], '../../logo.jpg', { type: 'image/jpeg' })),
    );
    expect(response.status).toBe(200);
    const [path, buffer, sha, message] = mocks.commitFile.mock.calls[0]!;
    expect(path).toMatch(/^public\/images\/uploads\/[\w-]+\.webp$/);
    expect(sha).toBe(null);
    expect(message).toContain('[skip netlify]');
    const metadata = await sharp(buffer).metadata();
    expect(metadata.format).toBe('webp');
    expect(metadata.width).toBeLessThanOrEqual(2000);
    expect(metadata.exif).toBeUndefined();
  });
});
