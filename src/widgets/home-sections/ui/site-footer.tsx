import { siteConfig } from '@/shared/config/site';
import { Container } from '@/shared/ui';

const footerNav = [
  { label: 'Услуги', href: '/#services' },
  { label: 'Результаты', href: '/#results' },
  { label: 'О враче', href: '/#doctor' },
  { label: 'Сертификаты', href: '/ser' },
  { label: 'Контакты', href: '/#contacts' },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border pt-8 pb-28 sm:pt-10 sm:pb-28 lg:pb-10">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <p className="font-display text-heading-3 text-text-strong">{siteConfig.name}</p>
            <p className="mt-2 type-eyebrow text-text-muted">{siteConfig.role} · Бишкек</p>
          </div>
          <nav aria-label="Навигация в подвале">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-body-sm text-text-muted">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a className="transition-colors hover:text-text-strong" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 grid gap-4 border-t border-border pt-6 text-caption text-text-muted sm:grid-cols-[1fr_auto]">
          <p>Информация на сайте не заменяет очную консультацию врача.</p>
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        </div>
      </Container>
    </footer>
  );
}
