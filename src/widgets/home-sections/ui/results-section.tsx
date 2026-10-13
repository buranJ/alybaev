import { ArrowUpRight } from 'lucide-react';

import { homeContent } from '@/content/home';
import { siteConfig } from '@/shared/config/site';
import { Container, buttonVariants } from '@/shared/ui';

import { ResultsSlider } from './results-slider';
import { ReviewsSection } from './reviews-section';

export function ResultsSection() {
  return (
    <>
      <section
        id="results"
        className="scroll-mt-24 py-(--spacing-section)"
        aria-labelledby="results-title"
      >
        <Container>
          <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="type-eyebrow text-accent">{homeContent.resultsSection.eyebrow}</p>
              <h2
                id="results-title"
                className="mt-6 max-w-[24ch] font-display text-display-lg font-light text-text-strong"
              >
                {homeContent.resultsSection.titleLines.map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: 'ghost', size: 'md', className: 'px-0' })}
              >
                {homeContent.resultsSection.instagramLabel}{' '}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
          <ResultsSlider />
        </Container>
      </section>

      <ReviewsSection />
    </>
  );
}
