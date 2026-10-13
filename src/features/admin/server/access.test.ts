// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));
const cookie = vi.hoisted(() => ({ value: 'a-token' as string | undefined }));
vi.mock('next/headers', () => ({
  cookies: async () => ({ get: () => (cookie.value ? { value: cookie.value } : undefined) }),
}));

import { assertSameOrigin, requireAdmin } from './access';

describe('admin access', () => {
  beforeEach(() => {
    vi.stubEnv('ADMIN_EMAILS', 'doctor@example.com');
    vi.stubEnv('GITHUB_CONTENT_TOKEN', 'server-test-token');
    cookie.value = 'a-token';
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('denies cross-origin writes and requests with no origin', () => {
    expect(() =>
      assertSameOrigin(
        new Request('https://alybaev.netlify.app/api/admin/content', {
          headers: { Origin: 'https://other.example' },
        }),
      ),
    ).toThrow();
    expect(() =>
      assertSameOrigin(new Request('https://alybaev.netlify.app/api/admin/content')),
    ).toThrow();
    expect(() =>
      assertSameOrigin(
        new Request('https://alybaev.netlify.app/api/admin/content', {
          headers: { Origin: 'https://alybaev.netlify.app' },
        }),
      ),
    ).not.toThrow();
  });

  it('denies missing sessions without contacting storage', async () => {
    cookie.value = undefined;
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    await expect(requireAdmin()).rejects.toMatchObject({ status: 401 });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('validates the session at Identity and rejects forged cookies', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 401 })));
    await expect(requireAdmin()).rejects.toMatchObject({ status: 401 });
  });

  it('rejects signed-in users outside the email allowlist', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          Response.json({ email: 'other@example.com', confirmed_at: '2026-10-13' }),
        ),
    );
    await expect(requireAdmin()).rejects.toMatchObject({ status: 403 });
  });

  it('rejects unconfirmed accounts even if the email is allowed', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(Response.json({ email: 'doctor@example.com' })),
    );
    await expect(requireAdmin()).rejects.toMatchObject({ status: 403 });
  });

  it('allows an explicitly authorized confirmed email', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          Response.json({ email: 'doctor@example.com', confirmed_at: '2026-10-13' }),
        ),
    );
    await expect(requireAdmin()).resolves.toEqual({ email: 'doctor@example.com' });
  });
});
