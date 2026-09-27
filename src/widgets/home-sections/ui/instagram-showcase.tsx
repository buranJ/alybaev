import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import { buttonVariants } from '@/shared/ui';

const instagramUrl = 'https://instagram.com/dr.alybaev';

const instagramImages = [
  { src: '/images/urmat-consultation.png', alt: 'Пластический хирург Урмат Алыбаев во время консультации', label: 'Доктор' },
  { src: '/images/instagram-anatomy-v2.png', alt: 'Анатомическое исследование области век', label: 'Планирование' },
  { src: '/images/instagram-profile-v3.png', alt: 'Профиль женщины с естественными чертами', label: 'Пропорции' },
  { src: '/images/instagram-preparation-v2.png', alt: 'Подготовка хирургических инструментов', label: 'Подготовка' },
] as const;

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function InstagramLink({ inverse = false }: { readonly inverse?: boolean }) {
  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noreferrer"
      className={buttonVariants({
        variant: 'outline',
        size: 'lg',
        className: inverse ? 'w-fit border-accent bg-accent text-on-dark hover:border-accent-line hover:bg-accent-line' : 'w-fit',
      })}
    >
      <InstagramIcon />
      Открыть Instagram
      <ArrowUpRight aria-hidden="true" className="size-4" />
    </a>
  );
}

function ImageLink({ src, alt, label, className, sizes, compactLabel = false }: { readonly src: string; readonly alt: string; readonly label: string; readonly className: string; readonly sizes: string; readonly compactLabel?: boolean }) {
  return (
    <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label={`${label} — открыть профиль Урмата Алыбаева в Instagram`} className={`group relative overflow-hidden bg-surface-muted ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover transition-transform duration-(--duration-slow) group-hover:scale-[1.025]" />
      <span className={`absolute rounded-full bg-text-strong/80 text-on-dark backdrop-blur-sm ${compactLabel ? 'right-2 bottom-2 left-2 px-2 py-1.5 text-center text-[0.625rem] leading-none tracking-[0.06em] whitespace-nowrap uppercase' : 'bottom-3 left-3 px-3 py-1.5 type-eyebrow'}`}>
        {label}
      </span>
    </a>
  );
}

export function InstagramShowcase() {
  return (
    <div className="mt-20">
      <div className="relative min-h-[40rem] overflow-hidden rounded-[var(--radius-xl)] bg-text-strong text-on-dark lg:hidden">
        <Image src={instagramImages[0].src} alt={instagramImages[0].alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-text-strong via-text-strong/15 to-transparent" />

        <div className="absolute top-5 right-5 grid w-32 gap-2">
          {instagramImages.slice(1, 3).map((image) => (
            <ImageLink key={image.src} {...image} compactLabel sizes="8rem" className="aspect-[4/3] rounded-[var(--radius-md)] border border-on-dark/40" />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-7 pb-24">
          <p className="type-eyebrow text-on-dark/60">Instagram</p>
          <h3 className="mt-5 max-w-[12ch] font-display text-heading-1 font-light">Больше историй и новых публикаций</h3>
          <div className="mt-7"><InstagramLink inverse /></div>
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-[var(--radius-xl)] bg-accent-soft lg:grid lg:min-h-[44rem] lg:grid-cols-12">
        <ImageLink {...instagramImages[0]} sizes="42vw" className="aspect-[4/5] rounded-[var(--radius-xl)] lg:col-span-5 lg:aspect-auto" />

        <div className="flex flex-col p-12 lg:col-span-7">
          <p className="type-eyebrow text-accent">Instagram</p>
          <h3 className="mt-6 max-w-[14ch] font-display text-display-lg font-light text-text-strong">Больше историй, ответов и новых публикаций</h3>
          <p className="mt-7 max-w-[48ch] text-body text-text-muted">В профиле доктор рассказывает о своём подходе, восстановлении и отвечает на вопросы пациентов.</p>
          <div className="mt-9"><InstagramLink /></div>

          <div className="mt-auto grid grid-cols-2 gap-3 pt-12">
            <ImageLink {...instagramImages[1]} sizes="22vw" className="aspect-[4/3] rounded-[var(--radius-lg)]" />
            <ImageLink {...instagramImages[3]} sizes="22vw" className="aspect-[4/3] rounded-[var(--radius-lg)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
