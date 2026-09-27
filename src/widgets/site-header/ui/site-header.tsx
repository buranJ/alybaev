import Link from 'next/link';

import { headerContent } from '@/content/header';
import { siteConfig } from '@/shared/config/site';
import { ArrowUpRight, BrandLogo, buttonVariants, Container } from '@/shared/ui';

import { HeaderShell } from './header-shell';
import { MobileMenu } from './mobile-menu';
import { NavDesktop } from './nav-desktop';

export function SiteHeader() {
  const { brand, nav, cta, menuEyebrow } = headerContent;

  return (
    <HeaderShell>
      <Container className="relative flex h-full items-center">
        <div className="flex shrink-0 items-center">
          <Link
            href="/"
            aria-label={`${brand.name} — в начало страницы`}
            className="flex shrink-0 items-center gap-3"
          >
            <BrandLogo />
          </Link>
        </div>

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 2xl:block">
          <NavDesktop items={nav} />
        </div>

        <div className="ml-auto hidden shrink-0 2xl:flex 2xl:items-center 2xl:justify-end 2xl:gap-6">
          <a
            href={`tel:${siteConfig.phone.e164}`}
            className="font-mono text-caption tabular-nums text-text transition-colors duration-(--duration-fast) hover:text-text-strong"
          >
            {siteConfig.phone.display}
          </a>
          <a
            href={cta.href}
            className={buttonVariants({ variant: 'accent', className: 'group pr-3' })}
          >
            {cta.labelShort}
            <span className="grid size-7 place-items-center rounded-full bg-surface text-accent">
              <ArrowUpRight className="transition-transform duration-(--duration-fast) group-hover:rotate-45" />
            </span>
          </a>
        </div>

        <div className="ml-auto 2xl:hidden">
          <MobileMenu items={nav} brand={brand} cta={cta} eyebrow={menuEyebrow} />
        </div>
      </Container>
    </HeaderShell>
  );
}
