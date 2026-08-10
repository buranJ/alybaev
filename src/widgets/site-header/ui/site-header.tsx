import Link from 'next/link';

import { headerContent } from '@/content/header';
import { siteConfig } from '@/shared/config/site';
import { ArrowUpRight, buttonVariants, Container } from '@/shared/ui';

import { HeaderShell } from './header-shell';
import { MobileMenu } from './mobile-menu';
import { NavDesktop } from './nav-desktop';

export function SiteHeader() {
  const { brand, nav, cta, menuEyebrow } = headerContent;

  return (
    <HeaderShell>
      <Container className="flex h-full items-center">
        {/* Левая половина — всё, что до оси симметрии. */}
        <div className="flex flex-1 items-center gap-4 lg:basis-1/2 lg:flex-none lg:gap-10 lg:pr-8">
          <Link
            href="/"
            aria-label={`${brand.name} — в начало страницы`}
            className="flex shrink-0 items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-border-strong font-mono text-caption text-text-strong"
            >
              {brand.monogram}
            </span>
            <span className="hidden sm:block">
              <span className="block font-display text-body-sm leading-none font-light text-text-strong">
                {brand.name}
              </span>
              <span className="type-eyebrow mt-1.5 block text-text-muted">{brand.role}</span>
            </span>
          </Link>

          <NavDesktop items={nav} />
        </div>

        {/* Правая половина. Её левая граница и есть ось симметрии страницы. */}
        <div className="hidden lg:flex lg:basis-1/2 lg:flex-none lg:items-center lg:justify-end lg:gap-6 lg:self-stretch lg:border-l lg:border-border lg:pl-8">
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

        <MobileMenu items={nav} brand={brand} cta={cta} eyebrow={menuEyebrow} />
      </Container>
    </HeaderShell>
  );
}
