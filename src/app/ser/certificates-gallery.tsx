import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import { homeContent } from '@/content/home';

function CertificateDocument({ index }: { index: number }) {
  const certificate = homeContent.certificates[index];

  return (
    <a
      href={certificate.src}
      target="_blank"
      rel="noreferrer"
      className={`group relative block overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-card ${certificate.orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
      aria-label={`Открыть: ${certificate.alt}`}
    >
      <Image
        src={certificate.src}
        alt={certificate.alt}
        fill
        sizes="(min-width: 1024px) 46vw, (min-width: 640px) 70vw, 100vw"
        className="object-contain p-3 transition-transform duration-(--duration-slow) group-hover:scale-[1.015] sm:p-5"
      />
      <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full border border-border bg-surface text-text-strong opacity-0 transition-opacity duration-(--duration-base) group-hover:opacity-100 sm:bottom-5 sm:right-5">
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </span>
    </a>
  );
}

export function CertificatesGallery() {
  return (
    <div className="rounded-[calc(var(--radius-lg)*1.5)] border border-border bg-surface px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="type-eyebrow text-accent">Личное дело</p>
        <h2 className="mt-4 font-display text-display-md font-light text-text-strong">Каждый документ — отдельная глава</h2>
      </div>

      <div className="relative mt-12 lg:mt-20">
        <div aria-hidden="true" className="absolute bottom-0 left-3 top-0 w-px bg-border lg:left-1/2" />
        <div className="space-y-10 lg:space-y-16">
          {homeContent.certificates.map((certificate, index) => {
            const right = index % 2 === 1;

            return (
              <div key={certificate.src} className="relative pl-9 lg:grid lg:grid-cols-2 lg:gap-20 lg:pl-0">
                <span aria-hidden="true" className="absolute left-1.5 top-8 z-10 size-3 rounded-full border border-accent bg-surface lg:left-1/2 lg:-translate-x-1/2" />
                <div className={right ? 'lg:col-start-2 lg:pl-3' : 'lg:pr-3'}>
                  <CertificateDocument index={index} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
