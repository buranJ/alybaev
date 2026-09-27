'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { homeContent } from '@/content/home';

type Review = (typeof homeContent.reviews)[number];

interface ReviewVariantProps {
  readonly activeIndex: number;
  readonly activeReview: Review;
  readonly move: (direction: -1 | 1) => void;
  readonly setActiveIndex: (index: number) => void;
  readonly cardClassName: string;
}

function ReviewsLayout({ activeIndex, activeReview, move, setActiveIndex, cardClassName }: ReviewVariantProps) {
  return (
    <div className="grid gap-3 border-t border-border-strong pt-8 lg:grid-cols-[0.55fr_1.45fr]">
      <nav className="order-2 rounded-[var(--radius-xl)] border border-border-strong bg-surface/40 p-3 lg:order-1" aria-label="Выбрать отзыв">
        {homeContent.reviews.map((review, index) => (
          <button key={review.text} type="button" onClick={() => setActiveIndex(index)} aria-current={index === activeIndex ? 'true' : undefined} className={`flex w-full items-center justify-between gap-5 rounded-[var(--radius-md)] px-4 py-4 text-left text-body-sm transition-colors ${index === activeIndex ? 'bg-accent text-on-dark' : 'text-text-muted hover:bg-surface hover:text-text-strong'}`}>
            <span>{review.procedure}</span>
            {index === activeIndex ? <ArrowRight aria-hidden="true" className="size-4 text-on-dark" /> : null}
          </button>
        ))}
      </nav>

      <article className={`order-1 flex min-h-[32rem] flex-col rounded-[var(--radius-xl)] p-7 text-text-strong shadow-card sm:p-10 lg:order-2 lg:p-14 ${cardClassName}`}>
        <p className="type-eyebrow text-accent">{activeReview.procedure}</p>
        <blockquote className="mt-10 max-w-[31ch] font-accent text-[clamp(1.8rem,3vw,3.25rem)] leading-[1.14] italic">«{activeReview.text}»</blockquote>
        <div className="mt-auto flex items-end justify-between gap-6 pt-12">
          <p className="max-w-[24ch] text-caption text-text-muted">Отзыв из архива врача</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => move(-1)} aria-label="Предыдущий отзыв" className="grid size-12 place-items-center rounded-full bg-accent/75 text-on-dark transition-colors hover:bg-accent-line"><ArrowLeft aria-hidden="true" className="size-4" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Следующий отзыв" className="grid size-12 place-items-center rounded-full bg-accent text-on-dark transition-colors hover:bg-accent-line"><ArrowRight aria-hidden="true" className="size-4" /></button>
          </div>
        </div>
      </article>
    </div>
  );
}

export function ReviewsSlider({ cardClassName = 'bg-surface' }: { readonly cardClassName?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = homeContent.reviews[activeIndex];

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + homeContent.reviews.length) % homeContent.reviews.length);
  };

  if (!activeReview) return null;

  return <ReviewsLayout activeIndex={activeIndex} activeReview={activeReview} move={move} setActiveIndex={setActiveIndex} cardClassName={cardClassName} />;
}
