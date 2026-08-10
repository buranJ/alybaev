import Image from 'next/image';

import { heroContent } from '@/content/hero';
import { ArrowUpRight, buttonVariants, Container, Eyebrow } from '@/shared/ui';

export function Hero() {
  const { eyebrow, title, description, primaryAction, secondaryAction, stats, note, image } =
    heroContent;

  return (
    <section className="overflow-hidden pb-5 lg:pb-8" aria-labelledby="hero-title">
      <Container>
        <div className="grid min-h-[calc(100svh-var(--spacing-header)-1.25rem)] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface shadow-card lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="relative z-10 flex flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-16 xl:py-14">
            <div className="hero-reveal">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h1
                id="hero-title"
                className="mt-8 max-w-[12ch] font-display text-display-lg font-light text-text-strong sm:mt-12 lg:mt-auto lg:text-display-xl"
              >
                {title.lead}{' '}
                <span className="font-accent font-normal text-accent italic">{title.accent}</span>
              </h1>
              <p className="mt-6 max-w-[34rem] text-body-lg text-text sm:mt-8">{description}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={primaryAction.href}
                  className={buttonVariants({
                    variant: 'accent',
                    size: 'lg',
                    className: 'group justify-between sm:justify-center',
                  })}
                >
                  {primaryAction.label}
                  <ArrowUpRight className="transition-transform duration-(--duration-fast) group-hover:rotate-45" />
                </a>
                <a
                  href={secondaryAction.href}
                  className={buttonVariants({ variant: 'ghost', size: 'lg' })}
                >
                  {secondaryAction.label}
                </a>
              </div>
            </div>

            <dl className="hero-reveal-delay mt-12 grid grid-cols-3 border-t border-border pt-5 lg:mt-auto">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={index === 0 ? 'pr-3' : 'border-l border-border px-3 sm:px-5'}
                >
                  <dt className="mt-1 max-w-28 text-caption text-text-muted">{stat.label}</dt>
                  <dd className="font-display text-heading-2 font-light text-text-strong">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative min-h-[34rem] overflow-hidden bg-accent-soft sm:min-h-[42rem] lg:min-h-0">
            <div className="absolute inset-4 rounded-[var(--radius-lg)] border border-surface/70" />
            <div className="hero-orbit absolute top-1/2 left-1/2 size-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-line/35" />
            <div className="hero-orbit-reverse absolute top-1/2 left-1/2 size-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-surface" />

            <svg
              aria-hidden="true"
              className="absolute inset-x-0 top-[14%] h-[46%] w-full text-accent-line/40"
              viewBox="0 0 760 390"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M-40 250C138 72 268 68 376 188C486 310 593 293 800 86" stroke="currentColor" />
              <path d="M-30 282C145 105 278 101 386 218C493 334 621 315 792 140" stroke="currentColor" />
              <circle cx="378" cy="204" r="112" stroke="currentColor" strokeDasharray="3 8" />
            </svg>

            <div className="absolute top-6 left-6 z-20 hidden max-w-52 rounded-[var(--radius-lg)] border border-surface/70 bg-surface/80 p-4 shadow-card backdrop-blur-md sm:top-8 sm:left-8 sm:block">
              <p className="type-eyebrow text-text-muted">Философия</p>
              <p className="mt-3 text-body-sm text-text-strong">
                Не менять черты. Точно работать с тем, что уже ваше.
              </p>
            </div>

            <div className="absolute top-6 right-6 z-20 flex items-center gap-3 rounded-full border border-surface/70 bg-surface/80 py-2 pr-2 pl-4 shadow-card backdrop-blur-md sm:top-8 sm:right-8">
              <span className="size-2 rounded-full bg-success" />
              <span className="text-caption text-text-strong">Приём в Бишкеке</span>
              <span className="grid size-8 place-items-center rounded-full bg-accent text-on-dark">
                <ArrowUpRight />
              </span>
            </div>

            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="hero-portrait z-10 object-contain object-bottom"
            />

            <div className="absolute right-5 bottom-5 left-5 z-20 flex items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-surface/70 bg-surface/85 px-4 py-3 shadow-float backdrop-blur-md sm:right-8 sm:bottom-8 sm:left-8 sm:px-5">
              <div>
                <p className="font-display text-body font-light text-text-strong">Урмат Алыбаев</p>
                <p className="mt-0.5 text-caption text-text-muted">Пластический хирург</p>
              </div>
              <p className="hidden max-w-52 text-right text-caption text-text-muted sm:block">{note}</p>
              <span className="font-mono text-caption text-accent">UA / 01</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
