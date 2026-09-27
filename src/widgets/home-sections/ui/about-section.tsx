import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import { homeContent } from '@/content/home';
import { Container } from '@/shared/ui';

export function AboutSection() {
  const { about } = homeContent;

  return (
    <section id="doctor" className="scroll-mt-24 overflow-hidden py-(--spacing-section)" aria-labelledby="doctor-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <p className="type-eyebrow text-accent">{about.eyebrow}</p>
            <h2 id="doctor-title" className="mt-6 max-w-[14ch] font-display text-display-lg font-light text-text-strong">
              {about.title}
            </h2>
            <div className="mt-10 max-w-3xl columns-1 gap-8 text-body-lg text-text-muted sm:columns-2">
              {about.paragraphs.map((paragraph) => <p key={paragraph} className="mb-5 break-inside-avoid">{paragraph}</p>)}
            </div>
            <div className="mt-12 border-t border-border">
              {about.milestones.map((milestone) => (
                <a key={milestone.year} href={milestone.href} target="_blank" rel="noreferrer" className="group grid gap-4 border-b border-border py-6 sm:grid-cols-[5rem_0.8fr_1.2fr_auto] sm:items-start sm:gap-6">
                  <span className="font-mono text-caption text-accent">{milestone.year}</span>
                  <h3 className="font-display text-heading-3 text-text-strong">{milestone.title}</h3>
                  <p className="text-body-sm text-text-muted">{milestone.description}</p>
                  <ArrowUpRight aria-hidden="true" className="size-4 text-text-muted transition-transform group-hover:rotate-45" />
                </a>
              ))}
            </div>
          </div>

          <div className="relative min-h-[36rem] lg:col-span-5 lg:min-h-[46rem]">
            <div className="absolute top-0 right-0 h-[86%] w-[92%] overflow-hidden rounded-[var(--radius-xl)] bg-accent-soft">
              <Image src="/images/urmat-consultation.png" alt="Урмат Алыбаев во время консультации" fill sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-linear-to-b from-text-strong/45 to-transparent p-6 text-on-dark sm:p-8">
                <span className="type-eyebrow text-on-dark/70">Консультация</span>
                <span className="type-eyebrow text-on-dark/70">Бишкек</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-[68%] rounded-[var(--radius-lg)] border border-accent-line/40 bg-accent-soft p-7 text-text-strong shadow-float sm:p-9">
              <p className="type-eyebrow text-accent">Принцип работы</p>
              <ul className="mt-8 space-y-5">
                {about.principles.map((principle) => (
                  <li key={principle} className="border-t border-accent-line/40 pt-4 text-body-sm">
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
