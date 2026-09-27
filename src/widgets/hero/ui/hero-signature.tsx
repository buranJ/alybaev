import Image from 'next/image';

import { heroContent } from '@/content/hero';
import { ArrowUpRight, Container } from '@/shared/ui';

const procedures = ['Блефаропластика', 'Отопластика'] as const;

export function HeroSignature() {
  const { stats, note, image } = heroContent;

  return (
    <section className="pb-5 lg:pb-8" aria-labelledby="hero-signature-title">
      <Container>
        <h1 id="hero-signature-title" className="sr-only">
          Пластический хирург Урмат Алыбаев
        </h1>

        <div className="flex flex-col gap-3 lg:grid lg:min-h-[calc(100svh-var(--spacing-header)-1.25rem)] lg:grid-cols-12">
          <div className="order-2 grid grid-cols-2 gap-3 lg:order-1 lg:col-span-4 lg:grid-rows-[auto_auto_1fr]">
            <article className="col-span-2 flex flex-col rounded-[var(--radius-xl)] border border-border bg-surface p-6 lg:min-h-[18rem] lg:p-8">
              <p className="type-eyebrow text-text-muted">Принцип работы</p>

              <blockquote className="mt-8 max-w-[18ch] font-accent text-quote text-text-strong italic lg:mt-12">
                «Сохранить узнаваемость важнее, чем следовать идеалу»
              </blockquote>
              <p className="mt-5 text-caption text-text-muted lg:mt-6">Очная консультация перед операцией</p>
            </article>

            {stats.slice(0, 2).map((stat) => (
              <div
                key={stat.label}
                className="flex min-h-36 flex-col rounded-[var(--radius-lg)] bg-surface-muted p-5 sm:min-h-40 sm:p-6"
              >
                <p className="font-display text-heading-1 font-light text-text-strong">{stat.value}</p>
                <p className="mt-auto max-w-28 pt-6 text-caption text-text-muted">{stat.label}</p>
              </div>
            ))}

            <div className="col-span-2 flex flex-col rounded-[var(--radius-xl)] border border-border bg-surface p-5 sm:p-6">
              <p className="type-eyebrow text-text-muted">Направления</p>
              <ul className="mt-5 grid flex-1 grid-rows-2 border-t border-border">
                {procedures.map((procedure) => (
                  <li key={procedure} className="border-b border-border">
                    <a
                      href="#services"
                      className="group flex h-full min-h-14 items-center justify-between gap-4 py-4 text-body text-text-strong"
                    >
                      <span>{procedure}</span>
                      <ArrowUpRight className="text-accent transition-transform duration-(--duration-fast) group-hover:rotate-45" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative order-1 min-h-[calc(100svh-var(--spacing-header)-1rem)] overflow-hidden rounded-[var(--radius-xl)] bg-accent-soft sm:min-h-[44rem] lg:order-2 lg:col-span-8 lg:min-h-0">
            <div className="absolute inset-3 rounded-[var(--radius-lg)] border border-surface/80 sm:inset-5" />

            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full text-accent-line/35"
              viewBox="0 0 880 850"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              <circle cx="244" cy="186" r="244" stroke="currentColor" />
              <circle cx="244" cy="186" r="140" stroke="currentColor" />
              <path d="M-78 504C127 250 308 250 454 416C586 566 710 545 978 284" stroke="currentColor" />
              <path d="M-62 550C132 317 310 302 467 464C609 611 753 578 954 377" stroke="currentColor" />
            </svg>

            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="origin-bottom scale-[1.12] object-contain object-bottom pt-10 sm:scale-100 sm:pt-8 lg:pt-10"
            />

            <div className="absolute top-5 left-5 z-20 grid w-[17rem] grid-cols-1 items-center gap-4 rounded-[var(--radius-lg)] bg-surface px-4 py-4 shadow-float sm:top-auto sm:right-8 sm:bottom-8 sm:left-8 sm:w-auto sm:grid-cols-[1fr_1.15fr] sm:px-5">
              <div>
                <p className="font-display text-body font-light text-text-strong">Урмат Алыбаев</p>
                <p className="mt-1 text-caption text-text-muted">Пластический хирург</p>
              </div>
              <p className="hidden text-center text-caption text-text-muted sm:block">{note}</p>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
