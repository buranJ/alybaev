import Image from 'next/image';

import { heroContent } from '@/content/hero';
import { ArrowUpRight, buttonVariants, Container, Eyebrow } from '@/shared/ui';

const services = [
  { number: '01', name: 'Блефаропластика', note: 'Открытый и естественный взгляд' },
  { number: '02', name: 'Отопластика', note: 'Гармония формы и пропорций' },
] as const;

export function HeroBento() {
  const { primaryAction, image } = heroContent;

  return (
    <section className="pb-5 lg:pb-8" aria-labelledby="hero-bento-title">
      <Container>
        <div className="grid gap-3 lg:min-h-[calc(100svh-var(--spacing-header)-1.25rem)] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2 lg:grid-rows-[1fr_auto]">
            <div className="flex min-h-[31rem] flex-col rounded-[var(--radius-xl)] border border-border bg-surface p-6 sm:col-span-2 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between">
                <Eyebrow>Пластическая хирургия</Eyebrow>
                <span className="font-mono text-eyebrow text-text-muted">04</span>
              </div>
              <h1
                id="hero-bento-title"
                className="mt-16 max-w-[9ch] font-display text-display-lg font-light text-text-strong"
              >
                Территория точных решений
              </h1>
              <div className="mt-auto flex items-end justify-between gap-5 pt-10">
                <p className="max-w-xs text-body-sm text-text-muted">
                  Сохраняем индивидуальность. Меняем только то, что действительно беспокоит.
                </p>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border-strong text-text-strong">
                  <ArrowUpRight />
                </span>
              </div>
            </div>

            {services.map((service) => (
              <div
                key={service.number}
                className="flex min-h-44 flex-col rounded-[var(--radius-lg)] bg-surface-muted p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display text-heading-3 font-light text-text-strong">{service.name}</p>
                  <span className="font-mono text-eyebrow text-text-muted">{service.number}</span>
                </div>
                <p className="mt-auto max-w-44 pt-8 text-caption text-text-muted">{service.note}</p>
              </div>
            ))}
          </div>

          <div className="relative min-h-[42rem] overflow-hidden rounded-[var(--radius-xl)] bg-accent-soft lg:min-h-0">
            <div className="absolute inset-x-6 top-6 z-10 flex items-center justify-between border-t border-accent-line/40 pt-3 sm:inset-x-8 sm:top-8">
              <div>
                <p className="type-eyebrow text-text-muted">Урмат Алыбаев</p>
                <p className="mt-2 text-body-sm text-text-strong">Пластический хирург</p>
              </div>
              <p className="text-right font-mono text-eyebrow text-text-muted">Бишкек<br />42.87° N</p>
            </div>

            <span
              aria-hidden="true"
              className="absolute top-[18%] left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[clamp(5rem,11vw,10rem)] leading-none font-light tracking-[-0.06em] text-surface/75"
            >
              DR. ALYBAEV
            </span>

            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-contain object-bottom pt-24"
            />

            <div className="absolute right-5 bottom-5 left-5 z-10 flex flex-col gap-3 rounded-[var(--radius-lg)] bg-surface p-3 sm:right-8 sm:bottom-8 sm:left-8 sm:flex-row sm:items-center sm:justify-between sm:pl-5">
              <p className="max-w-64 text-body-sm text-text">
                Персональный план после очной консультации
              </p>
              <a
                href={primaryAction.href}
                className={buttonVariants({ variant: 'accent', size: 'lg', className: 'group justify-between' })}
              >
                Записаться
                <ArrowUpRight className="transition-transform duration-(--duration-fast) group-hover:rotate-45" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
