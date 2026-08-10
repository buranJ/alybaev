import Image from 'next/image';

import { heroContent } from '@/content/hero';
import { ArrowUpRight, buttonVariants, Container } from '@/shared/ui';

export function HeroJournal() {
  const { primaryAction, stats, image } = heroContent;

  return (
    <section className="pb-5 lg:pb-8" aria-labelledby="hero-journal-title">
      <Container>
        <div className="overflow-hidden rounded-[var(--radius-xl)] bg-text-strong text-on-dark">
          <div className="grid min-h-[calc(100svh-var(--spacing-header)-1.25rem)] grid-cols-1 lg:grid-cols-12">
            <div className="px-5 pt-8 sm:px-8 sm:pt-10 lg:col-span-12 lg:px-12 lg:pt-10 xl:px-14">
              <div className="flex items-center justify-between border-b border-on-dark/20 pb-4">
                <p className="type-eyebrow text-on-dark/60">Dr. Alybaev · Бишкек</p>
                <p className="font-mono text-eyebrow text-on-dark/60">Пластическая хирургия / 2026</p>
              </div>
            </div>

            <div className="flex flex-col px-5 py-8 sm:px-8 lg:col-span-7 lg:px-12 lg:py-10 xl:px-14">
              <h1
                id="hero-journal-title"
                className="max-w-[11ch] font-display text-display-lg font-light lg:text-display-xl"
              >
                Точность вместо перемен
              </h1>

              <div className="mt-8 grid gap-8 border-t border-on-dark/20 pt-6 sm:grid-cols-2 lg:mt-auto">
                <div>
                  <p className="type-eyebrow text-on-dark/50">Подход</p>
                  <p className="mt-4 max-w-xs text-body-lg text-on-dark/85">
                    Операция должна подчёркивать человека, а не работу хирурга.
                  </p>
                </div>
                <div>
                  <p className="type-eyebrow text-on-dark/50">Практика</p>
                  <p className="mt-4 max-w-xs text-body-sm text-on-dark/70">
                    Верхняя и нижняя блефаропластика, отопластика. План лечения определяется только после осмотра.
                  </p>
                </div>
              </div>

              <a
                href={primaryAction.href}
                className={buttonVariants({
                  variant: 'accent',
                  size: 'lg',
                  className: 'group mt-8 w-full justify-between sm:w-fit',
                })}
              >
                Обсудить задачу
                <ArrowUpRight className="transition-transform duration-(--duration-fast) group-hover:rotate-45" />
              </a>
            </div>

            <div className="relative min-h-[35rem] overflow-hidden bg-porcelain-100 lg:col-span-5 lg:m-4 lg:mt-0 lg:min-h-0 lg:rounded-[var(--radius-lg)]">
              <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between text-text-strong sm:inset-x-7 sm:top-7">
                <div>
                  <p className="font-display text-body font-light">Урмат Алыбаев</p>
                  <p className="mt-1 text-caption text-text-muted">Пластический хирург</p>
                </div>
                <span className="grid size-11 place-items-center rounded-full border border-border-strong font-mono text-caption">
                  УА
                </span>
              </div>

              <span
                aria-hidden="true"
                className="absolute top-1/2 -left-5 -translate-y-1/2 font-display text-[12rem] leading-none font-light text-border/70 sm:text-[16rem]"
              >
                01
              </span>

              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-contain object-bottom pt-16"
              />

              <dl className="absolute right-5 bottom-5 left-5 z-10 flex items-end justify-between rounded-[var(--radius-md)] bg-surface px-4 py-3 text-text-strong sm:right-7 sm:bottom-7 sm:left-7">
                <div>
                  <dt className="text-caption text-text-muted">Опыт</dt>
                  <dd className="mt-1 font-display text-heading-2 font-light">{stats[0]?.value}</dd>
                </div>
                <div className="text-right">
                  <dt className="text-caption text-text-muted">Операций</dt>
                  <dd className="mt-1 font-display text-heading-2 font-light">{stats[1]?.value}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
