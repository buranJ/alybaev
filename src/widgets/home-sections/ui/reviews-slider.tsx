'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { homeContent } from '@/content/home';

const reviewLayouts = [
  { id: 'editorial', label: 'Редакционный' },
  { id: 'cards', label: 'Карточки' },
  { id: 'focus', label: 'Фокус' },
] as const;

type ReviewLayout = (typeof reviewLayouts)[number]['id'];
type Review = (typeof homeContent.reviews)[number];

interface ReviewVariantProps {
  readonly activeIndex: number;
  readonly activeReview: Review;
  readonly move: (direction: -1 | 1) => void;
  readonly setActiveIndex: (index: number) => void;
}

function RoundControls({ move }: Pick<ReviewVariantProps, 'move'>) {
  return (
    <div className="flex gap-2">
      <button type="button" onClick={() => move(-1)} aria-label="Предыдущий отзыв" className="grid size-12 place-items-center rounded-full border border-on-dark/30 text-on-dark transition-colors hover:bg-on-dark hover:text-text-strong">
        <ArrowLeft aria-hidden="true" className="size-4" />
      </button>
      <button type="button" onClick={() => move(1)} aria-label="Следующий отзыв" className="grid size-12 place-items-center rounded-full bg-on-dark text-text-strong transition-colors hover:bg-accent-soft">
        <ArrowRight aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}

function EditorialVariant({ activeIndex, activeReview, move, setActiveIndex }: ReviewVariantProps) {
  return (
    <div className="grid gap-12 border-t border-on-dark/20 pt-8 lg:grid-cols-12 lg:gap-8">
      <article className="flex min-h-[28rem] flex-col lg:col-span-8 lg:pr-14">
        <p className="type-eyebrow text-accent-line">{activeReview.procedure}</p>
        <blockquote className="mt-10 max-w-[29ch] font-accent text-[clamp(1.8rem,3.2vw,3.5rem)] leading-[1.12] font-light italic text-on-dark">«{activeReview.text}»</blockquote>
        <div className="mt-auto pt-12"><RoundControls move={move} /></div>
      </article>

      <nav className="border-t border-on-dark/20 lg:col-span-4 lg:border-t-0 lg:border-l lg:pl-8" aria-label="Выбрать отзыв">
        {homeContent.reviews.map((review, index) => (
          <button key={review.text} type="button" onClick={() => setActiveIndex(index)} aria-current={index === activeIndex ? 'true' : undefined} className={`group flex w-full items-center justify-between gap-5 border-b border-on-dark/20 py-6 text-left transition-colors ${index === activeIndex ? 'text-on-dark' : 'text-on-dark/45 hover:text-on-dark/80'}`}>
            <span className="text-body-sm">{review.procedure}</span>
            <ArrowRight aria-hidden="true" className={`size-4 shrink-0 transition-transform ${index === activeIndex ? 'translate-x-0 text-accent-line' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
          </button>
        ))}
      </nav>
    </div>
  );
}

function CardsVariant({ activeIndex, setActiveIndex }: ReviewVariantProps) {
  return (
    <div className="-mr-(--container-pad) overflow-hidden border-t border-on-dark/20 pt-8">
      <div className="flex snap-x gap-3 overflow-x-auto pr-(--container-pad) pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {homeContent.reviews.map((review, index) => (
          <button key={review.text} type="button" onClick={() => setActiveIndex(index)} aria-current={index === activeIndex ? 'true' : undefined} className={`flex min-h-[25rem] w-[82vw] max-w-[25rem] shrink-0 snap-start flex-col rounded-[var(--radius-xl)] p-7 text-left transition-colors sm:w-[23rem] sm:p-8 ${index === activeIndex ? 'bg-accent-soft text-text-strong' : 'bg-on-dark text-text-strong hover:bg-surface-muted'}`}>
            <span className="type-eyebrow text-accent">{review.procedure}</span>
            <blockquote className="mt-10 font-accent text-[clamp(1.45rem,2vw,2rem)] leading-[1.2] italic">«{review.text}»</blockquote>
            <span className="mt-auto flex items-center justify-end pt-8 text-caption text-text-muted"><ArrowRight aria-hidden="true" className="size-4" /></span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FocusVariant({ activeIndex, activeReview, move, setActiveIndex }: ReviewVariantProps) {
  return (
    <div className="grid gap-3 border-t border-on-dark/20 pt-8 lg:grid-cols-[0.55fr_1.45fr]">
      <nav className="order-2 rounded-[var(--radius-xl)] border border-on-dark/20 p-3 lg:order-1" aria-label="Выбрать отзыв">
        {homeContent.reviews.map((review, index) => (
          <button key={review.text} type="button" onClick={() => setActiveIndex(index)} aria-current={index === activeIndex ? 'true' : undefined} className={`flex w-full items-center justify-between gap-5 rounded-[var(--radius-md)] px-4 py-4 text-left text-body-sm transition-colors ${index === activeIndex ? 'bg-on-dark text-text-strong' : 'text-on-dark/55 hover:text-on-dark'}`}>
            <span>{review.procedure}</span>
            {index === activeIndex ? <ArrowRight aria-hidden="true" className="size-4 text-accent" /> : null}
          </button>
        ))}
      </nav>

      <article className="order-1 flex min-h-[32rem] flex-col rounded-[var(--radius-xl)] bg-accent-soft p-7 text-text-strong sm:p-10 lg:order-2 lg:p-14">
        <p className="type-eyebrow text-accent">{activeReview.procedure}</p>
        <blockquote className="mt-10 max-w-[31ch] font-accent text-[clamp(1.8rem,3vw,3.25rem)] leading-[1.14] italic">«{activeReview.text}»</blockquote>
        <div className="mt-auto flex items-end justify-between gap-6 pt-12">
          <p className="max-w-[24ch] text-caption text-text-muted">Отзыв из архива врача</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => move(-1)} aria-label="Предыдущий отзыв" className="grid size-12 place-items-center rounded-full border border-text-strong/20 transition-colors hover:bg-surface"><ArrowLeft aria-hidden="true" className="size-4" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Следующий отзыв" className="grid size-12 place-items-center rounded-full bg-text-strong text-on-dark transition-colors hover:bg-accent"><ArrowRight aria-hidden="true" className="size-4" /></button>
          </div>
        </div>
      </article>
    </div>
  );
}

export function ReviewsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [layout, setLayout] = useState<ReviewLayout>('editorial');
  const activeReview = homeContent.reviews[activeIndex];

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + homeContent.reviews.length) % homeContent.reviews.length);
  };

  if (!activeReview) return null;

  const variantProps = { activeIndex, activeReview, move, setActiveIndex };

  return (
    <div>
      <div role="tablist" aria-label="Варианты дизайна отзывов" className="mb-8 flex flex-wrap gap-2">
        {reviewLayouts.map((item) => (
          <button key={item.id} type="button" role="tab" aria-selected={layout === item.id} onClick={() => setLayout(item.id)} className={`rounded-full border px-5 py-2.5 text-caption transition-colors ${layout === item.id ? 'border-on-dark bg-on-dark text-text-strong' : 'border-on-dark/25 text-on-dark/60 hover:border-on-dark/50 hover:text-on-dark'}`}>
            {item.label}
          </button>
        ))}
      </div>

      {layout === 'editorial' ? <EditorialVariant {...variantProps} /> : null}
      {layout === 'cards' ? <CardsVariant {...variantProps} /> : null}
      {layout === 'focus' ? <FocusVariant {...variantProps} /> : null}
    </div>
  );
}
