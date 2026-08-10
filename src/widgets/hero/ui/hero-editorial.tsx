import Image from 'next/image';

import { heroContent } from '@/content/hero';
import { ArrowUpRight, buttonVariants, Container, Eyebrow } from '@/shared/ui';

export function HeroEditorial() {
  const { description, primaryAction, secondaryAction, stats, image } = heroContent;

  return (
    <section className="pb-5 lg:pb-8" aria-labelledby="hero-editorial-title">
      <Container>
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface">
          <div className="grid lg:min-h-[calc(100svh-var(--spacing-header)-1.25rem)] lg:grid-cols-12">
            <div className="flex flex-col px-5 py-8 sm:px-8 sm:py-10 lg:col-span-5 lg:px-12 lg:py-12 xl:px-14">
              <div className="flex items-center justify-between gap-4">
                <Eyebrow>Пластическая хирургия</Eyebrow>
                <span className="font-mono text-eyebrow text-text-muted">01 / 03</span>
              </div>

              <h1
                id="hero-editorial-title"
                className="mt-12 max-w-[9ch] font-display text-display-lg font-light text-text-strong lg:mt-20"
              >
                Ваша внешность — не тренд.
              </h1>
              <p className="mt-6 max-w-sm text-body-lg text-text">
                {description} Решение принимается вместе с врачом после очной консультации.
              </p>

              <div className="mt-8 flex flex-col items-start gap-2">
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
                <a href={secondaryAction.href} className={buttonVariants({ variant: 'ghost', size: 'lg' })}>
                  Результаты работ
                </a>
              </div>

              <div className="mt-14 border-t border-border pt-5 lg:mt-auto">
                <p className="max-w-sm font-accent text-quote text-text-strong italic">
                  «Моя задача — сохранить узнаваемость, а не создать новое лицо»
                </p>
                <p className="mt-4 text-caption text-text-muted">Урмат Алыбаев · пластический хирург</p>
              </div>
            </div>

            <div className="relative min-h-[35rem] bg-sand-100 sm:min-h-[44rem] lg:col-span-7 lg:min-h-0">
              <div className="absolute inset-x-5 top-5 z-10 flex items-start justify-between border-t border-text-strong/25 pt-3 sm:inset-x-8 sm:top-8">
                <div>
                  <p className="type-eyebrow text-text-muted">Бишкек</p>
                  <p className="mt-2 text-body-sm text-text-strong">Очный приём</p>
                </div>
                <p className="max-w-44 text-right text-caption text-text-muted">
                  Блефаропластика<br />и отопластика
                </p>
              </div>

              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-contain object-bottom pt-20"
              />

              <dl className="absolute right-4 bottom-4 left-4 z-10 grid grid-cols-3 overflow-hidden rounded-[var(--radius-lg)] bg-surface sm:right-7 sm:bottom-7 sm:left-7">
                {stats.map((stat, index) => (
                  <div key={stat.label} className={index === 0 ? 'p-4 sm:p-5' : 'border-l border-border p-4 sm:p-5'}>
                    <dt className="text-caption text-text-muted">{stat.label}</dt>
                    <dd className="mt-2 font-display text-heading-2 font-light text-text-strong">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
