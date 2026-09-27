import { ArrowUpRight } from 'lucide-react';

import { homeContent } from '@/content/home';
import { Container, buttonVariants } from '@/shared/ui';

import { ResultsSlider } from './results-slider';
import { ReviewsSlider } from './reviews-slider';

export function ResultsSection() {
  return (
    <>
      <section id="results" className="scroll-mt-24 py-(--spacing-section)" aria-labelledby="results-title">
        <Container>
          <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="type-eyebrow text-accent">Пациенты</p>
              <h2 id="results-title" className="mt-6 max-w-[24ch] font-display text-display-lg font-light text-text-strong">
                <span className="block">Результат, который</span>
                <span className="block">не спорит с лицом</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <a href="https://instagram.com/dr.alybaev" target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'ghost', size: 'md', className: 'px-0' })}>Все работы в Instagram <ArrowUpRight aria-hidden="true" className="size-4" /></a>
            </div>
          </div>
          <ResultsSlider />
        </Container>
      </section>

      <section id="reviews" className="scroll-mt-24 overflow-hidden bg-text-strong py-(--spacing-section) text-on-dark" aria-labelledby="reviews-title">
        <Container>
          <div>
            <p className="type-eyebrow text-on-dark/50">Отзывы</p>
            <h2 id="reviews-title" className="mt-6 font-display text-display-lg font-light text-on-dark">Говорят пациенты</h2>
          </div>
          <div className="mt-14">
            <ReviewsSlider />
          </div>
        </Container>
      </section>
    </>
  );
}
