import Image from 'next/image';
import { homeContent } from '@/content/home';
import { Container } from '@/shared/ui';

export function ServicesSection() {
  const { services } = homeContent;
  const [blepharoplasty, otoplasty] = services;

  if (!blepharoplasty || !otoplasty) return null;

  return (
    <section id="services" className="scroll-mt-24 overflow-hidden bg-text-strong py-(--spacing-section) text-on-dark" aria-labelledby="services-title">
      <Container>
        <div>
          <p className="type-eyebrow text-on-dark/55">Направления</p>
          <h2 id="services-title" className="mt-6 max-w-[25ch] font-display text-display-lg font-light">
            <span className="block">Два направления,</span>
            <span className="block">одна точная специализация</span>
          </h2>
        </div>

        <div className="relative mt-16 min-h-[62rem] sm:min-h-[48rem] lg:min-h-[43rem]">
          <div className="absolute inset-x-0 top-0 h-[28rem] overflow-hidden rounded-[var(--radius-xl)] sm:h-[34rem]">
            <Image src="/images/services-still-life.png" alt="Художественная композиция, вдохновлённая пластикой века и уха" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-text-strong/10" />
            <span className="absolute top-5 right-5 rounded-full bg-surface px-4 py-2 type-eyebrow text-text-strong">Пластика формы</span>
          </div>

          <div className="absolute top-[22rem] left-0 w-[96%] rotate-[-1deg] rounded-[var(--radius-xl)] bg-surface p-6 text-text-strong shadow-float sm:top-[26rem] sm:w-[62%] sm:p-9 lg:top-[24rem] lg:w-[48%]">
            <div className="rotate-[1deg] sm:rotate-0">
              <p className="type-eyebrow text-accent">Фокус на естественности</p>
              <h3 className="mt-5 font-display text-heading-1">{blepharoplasty.title}</h3>
              <p className="mt-2 font-accent text-quote italic text-accent">{blepharoplasty.shortTitle}</p>
              <p className="mt-6 max-w-[46ch] text-body text-text">{blepharoplasty.description}</p>
              <p className="mt-7 text-caption text-text-muted">{blepharoplasty.details.join(' · ')}</p>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 w-[96%] rotate-[1deg] rounded-[var(--radius-xl)] bg-accent-soft p-6 text-text-strong shadow-float sm:w-[62%] sm:p-9 lg:w-[48%]">
            <div className="rotate-[-1deg] sm:rotate-0">
              <p className="type-eyebrow text-accent">Работа с пропорциями</p>
              <h3 className="mt-5 font-display text-heading-1">{otoplasty.title}</h3>
              <p className="mt-2 font-accent text-quote italic text-accent">{otoplasty.shortTitle}</p>
              <p className="mt-6 max-w-[46ch] text-body text-text">{otoplasty.description}</p>
              <p className="mt-7 text-caption text-text-muted">{otoplasty.details.join(' · ')}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
