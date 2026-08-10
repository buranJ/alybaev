import Image from 'next/image';

import { heroContent } from '@/content/hero';
import { ArrowUpRight, buttonVariants, Container } from '@/shared/ui';

export function HeroPoster() {
  const { primaryAction, image } = heroContent;

  return (
    <section className="pb-5 lg:pb-8" aria-labelledby="hero-poster-title">
      <Container>
        <div className="relative min-h-[48rem] overflow-hidden rounded-[var(--radius-xl)] bg-surface-muted lg:min-h-[calc(100svh-var(--spacing-header)-1.25rem)]">
          <div className="absolute inset-x-5 top-5 z-20 flex items-start justify-between border-t border-border-strong pt-3 sm:inset-x-8 sm:top-8 lg:inset-x-12 lg:top-10">
            <div>
              <p className="type-eyebrow text-text-muted">Урмат Алыбаев</p>
              <p className="mt-2 text-body-sm text-text-strong">Пластический хирург · Бишкек</p>
            </div>
            <p className="font-mono text-eyebrow text-text-muted">Портрет / 06</p>
          </div>

          <h1
            id="hero-poster-title"
            className="absolute inset-x-0 top-[18%] z-0 text-center font-display text-[clamp(4rem,11vw,10rem)] leading-[0.82] font-light tracking-[-0.07em] text-text-strong"
          >
            Хирургия,
            <br />
            <span className="text-accent">которую не замечают</span>
          </h1>

          <div className="absolute inset-x-0 bottom-0 top-[26%] z-10 mx-auto max-w-[43rem]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-contain object-bottom"
            />
          </div>

          <div className="absolute bottom-5 left-5 z-20 max-w-[19rem] rounded-[var(--radius-lg)] bg-surface p-5 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-12">
            <p className="text-body text-text-strong">
              Точный план. Честные ожидания. Результат, который не спорит с вашим лицом.
            </p>
            <a
              href={primaryAction.href}
              className={buttonVariants({
                variant: 'accent',
                size: 'lg',
                className: 'group mt-5 w-full justify-between',
              })}
            >
              Записаться
              <ArrowUpRight className="transition-transform duration-(--duration-fast) group-hover:rotate-45" />
            </a>
          </div>

          <div className="absolute right-5 bottom-5 z-20 hidden max-w-48 text-right sm:block sm:right-8 sm:bottom-8 lg:right-12 lg:bottom-10">
            <p className="font-display text-heading-2 font-light text-text-strong">5+ лет</p>
            <p className="mt-1 text-caption text-text-muted">практики пластической хирургии</p>
            <div className="mt-5 ml-auto h-px w-20 bg-border-strong" />
            <p className="mt-5 font-display text-heading-2 font-light text-text-strong">3000+</p>
            <p className="mt-1 text-caption text-text-muted">проведённых операций</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
