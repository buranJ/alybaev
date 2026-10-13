'use client';

import {
  acceptInvite,
  confirmEmail,
  hydrateSession,
  login,
  logout,
  recoverPassword,
  requestPasswordRecovery,
} from '@netlify/identity';
import { useEffect, useState, useSyncExternalStore } from 'react';

import type { AdminEntry, ContentData, JsonValue, MediaItem } from '../model/types';
import { AdminFields, validateFields } from './admin-fields';
import styles from './admin-panel.module.css';

function initialMedia(entries: AdminEntry[]): MediaItem[] {
  const images = new Set<string>();
  function collect(value: JsonValue) {
    if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === 'object')
      Object.entries(value).forEach(([key, value]) => {
        if (key === 'src' && typeof value === 'string') images.add(value);
        else collect(value);
      });
  }
  entries.forEach((entry) => collect(entry.data));
  return [...images].map((path) => ({ path, name: path.split('/').at(-1) ?? path }));
}

function subscribeDemo(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('admin-demo-save', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('admin-demo-save', callback);
  };
}

export function AdminPanel({ entries, demo }: { entries: AdminEntry[]; demo: boolean }) {
  const [user, setUser] = useState<string | null>(null);
  const [configured, setConfigured] = useState(true);
  const [checking, setChecking] = useState(!demo);
  const [selected, setSelected] = useState(entries[0]?.name ?? 'hero');
  const [data, setData] = useState<ContentData>(entries[0]?.data ?? {});
  const [sha, setSha] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(!demo);
  const [readFailed, setReadFailed] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [callback, setCallback] = useState<{ type: 'invite' | 'recovery'; token: string } | null>(
    null,
  );
  const [media, setMedia] = useState<MediaItem[]>(initialMedia(entries));
  const entry = entries.find((item) => item.name === selected) ?? entries[0];
  const storedDemo = useSyncExternalStore(
    subscribeDemo,
    () => (demo ? window.localStorage.getItem(`alybaev-admin-demo-${selected}`) : null),
    () => null,
  );
  let editorData = data;
  if (demo && !dirty) {
    try {
      editorData = storedDemo ? (JSON.parse(storedDemo) as ContentData) : (entry?.data ?? {});
    } catch {
      editorData = entry?.data ?? {};
    }
  }

  async function checkSession() {
    const response = await fetch('/api/admin/session', { cache: 'no-store' });
    const session = (await response.json()) as {
      configured?: boolean;
      user?: { email: string };
      error?: string;
    };
    if (session.configured === false) setConfigured(false);
    if (session.user) {
      setUser(session.user.email);
      return true;
    }
    if (!response.ok && response.status !== 401)
      setError(session.error ?? 'Не удалось проверить доступ.');
    return false;
  }

  useEffect(() => {
    if (demo) return;
    void (async () => {
      try {
        const hash = new URLSearchParams(window.location.hash.slice(1));
        const invite = hash.get('invite_token');
        const recovery = hash.get('recovery_token');
        const confirmation = hash.get('confirmation_token');
        await checkSession();
        if (invite || recovery) {
          setCallback({ type: invite ? 'invite' : 'recovery', token: invite ?? recovery ?? '' });
          window.history.replaceState(null, '', '/admin');
          return;
        }
        if (confirmation) {
          await confirmEmail(confirmation);
          window.history.replaceState(null, '', '/admin');
        } else await hydrateSession();
        await checkSession();
      } catch {
        setError('Не удалось подключить вход. Проверьте настройки Netlify Identity.');
      } finally {
        setChecking(false);
      }
    })();
  }, [demo]);

  useEffect(() => {
    if (!user || demo) return;
    const current = entries.find((item) => item.name === selected);
    if (!current) return;
    let cancelled = false;
    void fetch(`/api/admin/content?name=${selected}`, { cache: 'no-store' })
      .then(async (response) => {
        const value = (await response.json()) as { data: ContentData; sha: string; error?: string };
        if (!response.ok) throw new Error(value.error ?? 'Не удалось открыть раздел.');
        if (!cancelled) {
          setData(value.data);
          setSha(value.sha);
          setDirty(false);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setError(error instanceof Error ? error.message : 'Ошибка загрузки');
          setReadFailed(true);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selected, user, demo, entries]);

  useEffect(() => {
    if (!user) return;
    void fetch('/api/admin/media', { cache: 'no-store' }).then(async (response) => {
      if (response.ok) {
        const result = (await response.json()) as { items: MediaItem[] };
        setMedia(result.items);
      }
    });
  }, [user]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  async function authenticate(form: FormData) {
    setBusy(true);
    setError('');
    try {
      const password = String(form.get('password') ?? '');
      if (callback) {
        if (password.length < 10 || password !== form.get('repeatPassword'))
          throw new Error('Пароль должен содержать от 10 символов. Повтор должен совпадать.');
        if (callback.type === 'invite') await acceptInvite(callback.token, password);
        else await recoverPassword(callback.token, password);
        setCallback(null);
      } else await login(String(form.get('email')), password);
      if (!(await checkSession())) {
        await logout();
        throw new Error('Нет доступа к админке. Проверьте email и настройки доступа.');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Не удалось войти.');
    } finally {
      setBusy(false);
    }
  }

  async function save() {
    if (!entry) return;
    const invalid = validateFields(entry.fields, editorData);
    if (invalid.length) {
      setError(`Заполните корректно: ${invalid.slice(0, 5).join(', ')}`);
      return;
    }
    setBusy(true);
    setError('');
    setNotice('');
    try {
      if (demo) {
        window.localStorage.setItem(`alybaev-admin-demo-${selected}`, JSON.stringify(editorData));
        window.dispatchEvent(new Event('admin-demo-save'));
        setNotice('Сохранено в демо. Публичный сайт не изменён.');
      } else {
        const response = await fetch('/api/admin/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: selected, sha, data: editorData }),
        });
        const result = (await response.json()) as {
          sha: string;
          data: ContentData;
          error?: string;
        };
        if (!response.ok) throw new Error(result.error ?? 'Не удалось сохранить.');
        setSha(result.sha);
        setData(result.data);
        setNotice('Изменения сохранены. После успешной сборки Netlify они появятся на сайте.');
      }
      setDirty(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка сохранения');
    } finally {
      setBusy(false);
    }
  }

  if (!entry) return null;
  if (!user && !demo)
    return (
      <div className={`${styles.panel} ${styles.login}`}>
        <div className={styles.loginCard}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand-logo.svg" alt="Dr. Alybaev" className={styles.logo} />
          <h1>{callback ? 'Создайте пароль' : 'Управление сайтом'}</h1>
          <p className={styles.muted}>
            {callback
              ? 'Выберите пароль для доступа к админке.'
              : 'Тексты, фотографии и новые истории — в одном месте.'}
          </p>
          {checking ? (
            <p className={styles.notice}>Проверяем доступ…</p>
          ) : (
            <>
              {!configured && (
                <p className={styles.notice}>
                  Панель готова. Для входа нужно подключить Netlify Identity и разрешить email
                  администратора.
                </p>
              )}
              <form action={authenticate}>
                {!callback && (
                  <label className={styles.field}>
                    <span className={styles.label}>Email</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="username"
                      required
                      className={styles.input}
                    />
                  </label>
                )}
                <label className={styles.field}>
                  <span className={styles.label}>Пароль</span>
                  <input
                    type="password"
                    name="password"
                    autoComplete={callback ? 'new-password' : 'current-password'}
                    required
                    minLength={callback ? 10 : 1}
                    className={styles.input}
                  />
                </label>
                {callback && (
                  <label className={styles.field}>
                    <span className={styles.label}>Повторите пароль</span>
                    <input
                      type="password"
                      name="repeatPassword"
                      autoComplete="new-password"
                      required
                      className={styles.input}
                    />
                  </label>
                )}
                {error && (
                  <p role="alert" className={styles.error}>
                    {error}
                  </p>
                )}
                {notice && (
                  <p role="status" className={styles.notice}>
                    {notice}
                  </p>
                )}
                <button
                  type="submit"
                  className={styles.button}
                  disabled={busy || (!configured && !callback)}
                >
                  {busy ? 'Подождите…' : callback ? 'Сохранить пароль' : 'Войти'}
                </button>
                {!callback && (
                  <button
                    className={styles.link}
                    type="button"
                    style={{ display: 'block', marginTop: 12 }}
                    disabled={!configured || busy}
                    onClick={() => {
                      const input = document.querySelector<HTMLInputElement>('input[name="email"]');
                      if (!input?.value || !input.validity.valid) {
                        setError('Сначала введите email.');
                        return;
                      }
                      setBusy(true);
                      void requestPasswordRecovery(input.value)
                        .then(() =>
                          setNotice(
                            'Если этот email зарегистрирован, на него придёт письмо для восстановления.',
                          ),
                        )
                        .catch(() => setError('Не удалось отправить письмо. Попробуйте позже.'))
                        .finally(() => setBusy(false));
                    }}
                  >
                    Забыли пароль?
                  </button>
                )}
              </form>
              <a className={styles.link} href="/admin?demo=1">
                Посмотреть демо админки
              </a>
            </>
          )}
        </div>
      </div>
    );

  return (
    <div className={styles.panel}>
      {demo && (
        <div className={styles.demoBanner}>
          <span>Демо админки · изменения сохраняются только в этом браузере</span>
          <a href="/admin" className={styles.link}>
            Перейти ко входу
          </a>
        </div>
      )}
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.brand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/brand-logo.svg" alt="Dr. Alybaev" />
            <div>
              Управление
              <br />
              <span className={styles.muted}>сайтом врача</span>
            </div>
          </div>
          <nav aria-label="Разделы админки">
            {[...new Set(entries.map((entry) => entry.group))].map((group) => (
              <div key={group}>
                <p className={styles.groupName}>{group}</p>
                {entries
                  .filter((entry) => entry.group === group)
                  .map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      disabled={busy}
                      className={`${styles.navItem} ${selected === item.name ? styles.active : ''}`}
                      aria-current={selected === item.name ? 'page' : undefined}
                      onClick={() => {
                        if (
                          dirty &&
                          !window.confirm('Есть несохранённые изменения. Перейти без сохранения?')
                        )
                          return;
                        setSelected(item.name);
                        setLoading(!demo);
                        setDirty(false);
                        setReadFailed(false);
                        setNotice('');
                        setError('');
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
              </div>
            ))}
          </nav>
        </aside>
        <main className={styles.workspace}>
          <header className={styles.toolbar}>
            <div>
              <h1>{entry.label}</h1>
              <p className={styles.muted}>
                {dirty
                  ? 'Есть несохранённые изменения'
                  : 'Изменяйте содержимое и сохраняйте результат'}
              </p>
            </div>
            <div className={styles.actions}>
              <a
                href={entry.preview_path}
                target="_blank"
                rel="noreferrer"
                className={styles.secondary}
              >
                Открыть сайт ↗
              </a>
              <button
                className={styles.button}
                onClick={() => void save()}
                disabled={busy || loading || readFailed || !dirty}
              >
                {busy ? 'Сохраняем…' : 'Сохранить'}
              </button>
              {!demo && (
                <button
                  className={styles.link}
                  type="button"
                  onClick={() => {
                    if (dirty && !window.confirm('Выйти без сохранения изменений?')) return;
                    void logout().then(() => window.location.reload());
                  }}
                >
                  Выйти
                </button>
              )}
            </div>
          </header>
          {error && (
            <p role="alert" className={styles.error}>
              {error}
            </p>
          )}
          {notice && (
            <p role="status" className={styles.notice}>
              {notice}
            </p>
          )}
          {loading ? (
            <p className={styles.notice}>Загружаем раздел…</p>
          ) : readFailed ? (
            <p className={styles.notice}>
              Раздел не загружен. Выберите другой раздел и откройте этот снова.
            </p>
          ) : (
            <div className={styles.editor}>
              <AdminFields
                fields={entry.fields}
                data={editorData}
                onChange={(data) => {
                  setData(data);
                  setDirty(true);
                  setNotice('');
                }}
                demo={demo}
                media={media}
                onUploaded={(item) => setMedia((current) => [item, ...current])}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
