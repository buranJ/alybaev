import 'server-only';

import { AdminError } from './access';

const branch = 'main';
const base = 'https://api.github.com/repos/buranJ/alybaev';

export async function github(path: string, options: RequestInit = {}) {
  if (!process.env.GITHUB_CONTENT_TOKEN) throw new AdminError('Хранилище ещё не подключено.', 503);
  return fetch(`${base}${path}`, {
    ...options,
    cache: 'no-store',
    signal: AbortSignal.timeout(25000),
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_CONTENT_TOKEN}`,
      'X-GitHub-Api-Version': '2026-03-10',
      ...options.headers,
    },
  });
}

export async function readContent(path: string) {
  const response = await github(`/contents/${path}?ref=${branch}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new AdminError('Не удалось прочитать содержимое сайта.', 502);
  const file = (await response.json()) as { sha: string; content: string; encoding: string };
  if (file.encoding !== 'base64') throw new AdminError('Файл слишком большой для редактора.', 413);
  return { sha: file.sha, data: JSON.parse(Buffer.from(file.content, 'base64').toString('utf8')) };
}

export async function commitFile(
  path: string,
  content: Buffer,
  sha: string | null,
  message: string,
) {
  const response = await github(`/contents/${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      branch,
      message,
      content: content.toString('base64'),
      ...(sha ? { sha } : {}),
    }),
  });
  if (response.status === 409 || response.status === 422)
    throw new AdminError(
      'Файл изменился другим редактором. Обновите раздел и повторите сохранение.',
      409,
    );
  if (!response.ok)
    throw new AdminError('Не удалось сохранить. Проверьте доступ к хранилищу сайта.', 502);
  return (await response.json()) as { content: { sha: string }; commit: { sha: string } };
}
