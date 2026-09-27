'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { useRef, useState } from 'react';

import { homeContent } from '@/content/home';

type ResultItem = (typeof homeContent.results)[number];
type Filter = 'Все работы' | ResultItem['procedure'];

const filters: Filter[] = ['Все работы', 'Блефаропластика', 'Отопластика'];

export function ResultsSlider() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>('Все работы');
  const [selectedItem, setSelectedItem] = useState<ResultItem | null>(null);

  const visibleResults = activeFilter === 'Все работы'
    ? homeContent.results
    : homeContent.results.filter((item) => item.procedure === activeFilter);

  const move = (direction: -1 | 1) => {
    railRef.current?.scrollBy({ left: direction * Math.min(window.innerWidth * 0.78, 620), behavior: 'smooth' });
  };

  const selectFilter = (filter: Filter) => {
    setActiveFilter(filter);
    railRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  };

  const selectedIndex = selectedItem
    ? visibleResults.findIndex((item) => item.src === selectedItem.src)
    : -1;

  const selectAdjacent = (direction: -1 | 1) => {
    if (selectedIndex < 0) return;

    const nextIndex = (selectedIndex + direction + visibleResults.length) % visibleResults.length;
    const nextItem = visibleResults[nextIndex];

    if (nextItem) setSelectedItem(nextItem);
  };

  return (
    <Dialog.Root open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
      <div className="mb-8 flex flex-col justify-between gap-5 border-y border-border py-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2" aria-label="Фильтр работ">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => selectFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`rounded-full px-4 py-2 text-body-sm transition-colors ${activeFilter === filter ? 'bg-accent text-on-dark' : 'bg-accent-soft text-accent hover:bg-accent-line hover:text-on-dark'}`}
            >
              {filter}
            </button>
          ))}
        </div>
        <p className="type-eyebrow text-text-muted">Фотографии из архива врача</p>
      </div>

      <div>
        <div ref={railRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {visibleResults.map((item, index) => (
            <figure key={item.src} className="group w-[82vw] max-w-[36rem] shrink-0 snap-start sm:w-[58vw] lg:w-[38vw]">
              <button
                type="button"
                onClick={() => setSelectedItem(item)}
                className={`relative block aspect-square w-full overflow-hidden rounded-[var(--radius-xl)] bg-surface-muted text-left ${index % 2 ? 'lg:mt-12' : ''}`}
                aria-label={`Открыть работу: ${item.procedure}`}
              >
                <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 38vw, 82vw" className="object-cover transition-transform duration-(--duration-slow) group-hover:scale-[1.02]" />
                <span className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-accent/90 text-on-dark opacity-100 backdrop-blur-sm transition-[transform,opacity] group-hover:scale-105 lg:opacity-0 lg:group-hover:opacity-100">
                  <Expand aria-hidden="true" className="size-4" />
                </span>
              </button>
              <figcaption className="mt-5 border-t border-border pt-4">
                <span className="text-body-sm text-text-strong">{item.procedure}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-6">
          <p className="type-eyebrow text-accent sm:hidden">Листайте, чтобы увидеть больше</p>
          <div className="ml-auto flex shrink-0 gap-2">
            <button type="button" onClick={() => move(-1)} aria-label="Предыдущая работа" className="grid size-12 place-items-center rounded-full bg-accent/75 text-on-dark transition-colors hover:bg-accent-line"><ArrowLeft aria-hidden="true" className="size-4" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Следующая работа" className="grid size-12 place-items-center rounded-full bg-accent text-on-dark transition-colors hover:bg-accent-line"><ArrowRight aria-hidden="true" className="size-4" /></button>
          </div>
        </div>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-text-strong/75 backdrop-blur-md" />
        <Dialog.Content aria-describedby={undefined} className="fixed inset-3 z-[80] overflow-y-auto rounded-[var(--radius-xl)] bg-bg shadow-float sm:inset-6 lg:inset-10 lg:overflow-hidden">
          <Dialog.Title className="sr-only">Просмотр клинического случая</Dialog.Title>
          {selectedItem && (
            <div className="grid grid-rows-[minmax(18rem,58svh)_auto] lg:h-full lg:grid-cols-[1fr_20rem] lg:grid-rows-1">
              <div className="relative min-h-0 bg-surface-muted">
                <Image src={selectedItem.src} alt={selectedItem.alt} fill sizes="(min-width: 1024px) calc(100vw - 25rem), 100vw" className="object-contain p-3 sm:p-6" priority />
                <button type="button" onClick={() => selectAdjacent(-1)} aria-label="Предыдущий случай" className="absolute top-1/2 left-4 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-accent/80 text-on-dark shadow-card backdrop-blur-sm transition-colors hover:bg-accent-line sm:left-6">
                  <ArrowLeft aria-hidden="true" className="size-4" />
                </button>
                <button type="button" onClick={() => selectAdjacent(1)} aria-label="Следующий случай" className="absolute top-1/2 right-4 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-accent/90 text-on-dark shadow-card backdrop-blur-sm transition-colors hover:bg-accent-line sm:right-6">
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </div>
              <aside className="flex flex-col border-t border-border bg-surface p-5 sm:p-8 lg:border-t-0 lg:border-l">
                <div className="flex items-center justify-between">
                  <span className="type-eyebrow text-accent">Клинический случай</span>
                  <Dialog.Close aria-label="Закрыть просмотр" className="grid size-11 place-items-center rounded-full border border-border-strong text-text-strong transition-colors hover:bg-surface-muted">
                    <X aria-hidden="true" className="size-4" />
                  </Dialog.Close>
                </div>
                <p className="mt-6 font-display text-heading-2 text-text-strong lg:mt-12">{selectedItem.procedure}</p>
                <div className="mt-5 border-t border-border pt-5 lg:mt-auto lg:pt-6">
                  <p className="text-body-sm text-text-muted">Фотографии из архива врача публикуются с согласия пациентов. Результат всегда индивидуален.</p>
                </div>
              </aside>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
