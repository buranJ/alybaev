import { siteConfig } from '@/shared/config/site';
import { BrandLogo, Container } from '@/shared/ui';

const footerNav = [
  { label: 'Услуги', href: '/#services' },
  { label: 'Результаты', href: '/#results' },
  { label: 'О враче', href: '/#doctor' },
  { label: 'Сертификаты', href: '/ser#main-content' },
  { label: 'Контакты', href: '/#contacts' },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 lg:py-10">
      <Container>
        <div className="grid grid-cols-[auto_1fr] items-start gap-6 lg:grid-cols-[1fr_auto] lg:gap-10">
          <div className="pt-1">
            <BrandLogo className="origin-top-left scale-90" />
          </div>
          <nav aria-label="Навигация в подвале" className="min-w-0">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-caption text-text-muted sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3 sm:text-body-sm">
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
        <div className="mt-7 border-t border-border pt-5 text-caption text-text-muted lg:mt-10 lg:pt-6">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <p>© {new Date().getFullYear()} {siteConfig.name}</p>
            <p>
              Разработано{' '}
              <a href="https://itdos.dev/" target="_blank" rel="noreferrer" className="text-text-strong underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent">
                itdos.dev
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
