import 'server-only';

import { cookies } from 'next/headers';

export class AdminError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

export function setupStatus() {
  return {
    ready: Boolean(process.env.ADMIN_EMAILS?.trim() && process.env.GITHUB_CONTENT_TOKEN?.trim()),
    identityUrl:
      process.env.NETLIFY_IDENTITY_URL ?? 'https://alybaev.netlify.app/.netlify/identity',
  };
}

export function assertSameOrigin(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin)
    throw new AdminError('Запрос запрещён.', 403);
}

export async function requireAdmin() {
  if (!setupStatus().ready) throw new AdminError('Доступ к админке ещё не подключён.', 503);
  const token = (await cookies()).get('nf_jwt')?.value;
  if (!token) throw new AdminError('Войдите в админку.', 401);
  const response = await fetch(`${setupStatus().identityUrl}/user`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new AdminError('Сессия завершена. Войдите снова.', 401);
  const user = (await response.json()) as { email?: string; confirmed_at?: string };
  const allowed =
    process.env.ADMIN_EMAILS?.split(',').map((email) => email.trim().toLowerCase()) ?? [];
  if (!user.email || !user.confirmed_at || !allowed.includes(user.email.toLowerCase()))
    throw new AdminError('Для этого email доступ не предоставлен.', 403);
  return { email: user.email };
}

export function adminFailure(error: unknown) {
  return Response.json(
    {
      error:
        error instanceof AdminError
          ? error.message
          : 'Не удалось выполнить запрос. Попробуйте ещё раз.',
    },
    {
      status: error instanceof AdminError ? error.status : 502,
      headers: { 'Cache-Control': 'no-store' },
    },
  );
}

export function adminJson(value: unknown) {
  return Response.json(value, { headers: { 'Cache-Control': 'no-store' } });
}
