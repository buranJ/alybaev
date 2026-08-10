import Image from 'next/image';

import { heroContent } from '@/content/hero';
import { ArrowUpRight, buttonVariants, Container, Eyebrow } from '@/shared/ui';

export function HeroManifesto() {
  const { primaryAction, secondaryAction, stats, image } = heroContent;

  return (
    <section className="pb-5 lg:pb-8" aria-labelledby="hero-manifesto-title">
      <Container>
        <div className="border-y border-border py-8 sm:py-10 lg:py-12">
          <div className="flex items-center justify-between">
            <Eyebrow>Естественный результат</Eyebrow>
            <span className="font-mono text-eyebrow text-text-muted">05 / Манифест</span>
          </div>

          <h1
            id="hero-manifesto-title"
            className="mt-12 max-w-[13ch] font-display text-display-lg font-light text-text-strong lg:mt-16 lg:text-display-xl"
          >
            Лицо меняется.
            <br />
            <span className="text-accent">Вы — нет.</span>
          </h1>

          <div className="mt-12 grid items-end gap-10 lg:mt-16 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="max-w-xs text-body-lg text-text">
                Деликатная хирургия начинается не с операции, а с понимания человека.
              </p>
              <div className="mt-8 flex flex-col items-start gap-2">
                <a href={primaryAction.href} className={buttonVariants({ variant: 'accent', size: 'lg' })}>
                  Консультация <ArrowUpRight />
                </a>
                <a href={secondaryAction.href} className={buttonVariants({ variant: 'ghost' })}>
                  Посмотреть результаты
                </a>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[30rem] overflow-hidden rounded-full bg-sand-100 lg:col-span-5">
              <span
                aria-hidden="true"
                className="absolute inset-5 rounded-full border border-sand-200 sm:inset-8"
              />
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-contain object-bottom pt-6"
              />
            </div>

            <div className="lg:col-span-4 lg:pl-8">
              <p className="font-accent text-quote text-text-strong italic">
                «Хороший результат не требует объяснений — он просто выглядит естественно»
              </p>
              <dl className="mt-10 grid grid-cols-2 border-t border-border pt-5">
                <div>
                  <dt className="text-caption text-text-muted">Практика</dt>
                  <dd className="mt-2 font-display text-heading-1 font-light text-text-strong">{stats[0]?.value}</dd>
                </div>
                <div className="border-l border-border pl-5">
                  <dt className="text-caption text-text-muted">Операций</dt>
                  <dd className="mt-2 font-display text-heading-1 font-light text-text-strong">{stats[1]?.value}</dd>
                </div>
              </dl>
              <p className="mt-6 text-caption text-text-muted">Урмат Алыбаев · Бишкек</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
