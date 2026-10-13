import Image from 'next/image';
import { Play } from 'lucide-react';

import { homeContent } from '@/content/home';
import { Container } from '@/shared/ui';

import { InstagramShowcase } from './instagram-showcase';

export function MediaSection() {
  return (
    <section className="py-(--spacing-section)" aria-labelledby="philosophy-title">
      <Container>
        <div className="grid gap-5 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-text-strong p-7 text-on-dark sm:p-10 lg:col-span-5 lg:min-h-[38rem] lg:p-12">
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-20 size-72 rounded-full border border-on-dark/[0.06]"
            />
            <div
              aria-hidden="true"
              className="absolute top-24 -right-10 size-52 rounded-full border border-dashed border-on-dark/[0.08]"
            />
            <p className="type-eyebrow text-on-dark/70">{homeContent.media.philosophy.eyebrow}</p>
            <h2
              id="philosophy-title"
              className="relative mt-8 max-w-[11ch] font-accent text-[clamp(2.6rem,5vw,5.5rem)] leading-[0.92] italic"
            >
              {homeContent.media.philosophy.title}
            </h2>
            <p className="relative mt-10 max-w-[37ch] text-body text-on-dark/90">
              {homeContent.media.philosophy.description}
            </p>
            <p className="relative mt-16 type-eyebrow text-accent-soft">
              {homeContent.media.philosophy.signature}
            </p>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-xl)] bg-surface-muted lg:col-span-7">
            <div className="flex items-center justify-between border-b border-border p-6 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-text-strong text-on-dark">
                  <Play aria-hidden="true" className="size-3 fill-current" />
                </span>
                <span className="type-eyebrow text-text-muted">
                  {homeContent.media.video.eyebrow}
                </span>
              </div>
              <a
                href={homeContent.links.video}
                target="_blank"
                rel="noreferrer"
                className="text-caption text-text-muted transition-colors hover:text-text-strong"
              >
                {homeContent.media.video.label}
              </a>
            </div>
            <a
              href={homeContent.links.video}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-video overflow-hidden lg:min-h-[31rem]"
            >
              <Image
                src={homeContent.media.video.image.src}
                alt={homeContent.media.video.image.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-(--duration-slow) group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-text-strong/70 via-text-strong/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 text-on-dark sm:p-10">
                <div>
                  <p className="type-eyebrow text-on-dark/60">{homeContent.media.video.caption}</p>
                  <p className="mt-4 max-w-[16ch] font-display text-heading-2">
                    {homeContent.media.video.title}
                  </p>
                </div>
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-surface text-text-strong transition-transform group-hover:scale-105">
                  <Play aria-hidden="true" className="ml-1 size-5 fill-current" />
                </span>
              </div>
            </a>
          </div>
        </div>

        <InstagramShowcase />
      </Container>
    </section>
  );
}
