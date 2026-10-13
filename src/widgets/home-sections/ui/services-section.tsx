import Image from 'next/image';
import { homeContent } from '@/content/home';
import { Container } from '@/shared/ui';

export function ServicesSection() {
  const { services, servicesSection } = homeContent;
  const [blepharoplasty, otoplasty] = services;

  if (!blepharoplasty) return null;

  return (
    <section
      id="services"
      className="scroll-mt-24 overflow-hidden bg-text-strong py-(--spacing-section) text-on-dark"
      aria-labelledby="services-title"
    >
      <Container>
        <div>
          <p className="type-eyebrow text-on-dark/55">{servicesSection.eyebrow}</p>
          <h2
            id="services-title"
            className="mt-6 max-w-[25ch] font-display text-display-lg font-light"
          >
            {servicesSection.titleLines.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="relative h-[28rem] overflow-hidden rounded-[var(--radius-xl)] sm:h-[34rem]">
            <Image
              src={servicesSection.image.src}
              alt={servicesSection.image.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-text-strong/10" />
            <span className="absolute top-5 right-5 rounded-full bg-surface px-4 py-2 type-eyebrow text-text-strong">
              {servicesSection.imageLabel}
            </span>
          </div>

          <div className="relative -mt-24 grid items-start gap-5 sm:-mt-32 lg:-mt-40 lg:grid-cols-2 lg:gap-8">
            <div className="w-[96%] rotate-[-1deg] rounded-[var(--radius-xl)] bg-surface p-6 text-text-strong shadow-float sm:w-[82%] sm:p-9 lg:w-full">
              <div className="rotate-[1deg] sm:rotate-0">
                <p className="type-eyebrow text-accent">{blepharoplasty.eyebrow}</p>
                <h3 className="mt-5 font-display text-heading-1">{blepharoplasty.title}</h3>
                <p className="mt-2 font-accent text-quote text-accent italic">
                  {blepharoplasty.shortTitle}
                </p>
                <p className="mt-6 max-w-[46ch] text-body text-text">
                  {blepharoplasty.description}
                </p>
                <p className="mt-7 text-caption text-text-muted">
                  {blepharoplasty.details.join(' · ')}
                </p>
              </div>
            </div>

            {otoplasty && (
              <div className="ml-auto w-[96%] rotate-[1deg] rounded-[var(--radius-xl)] bg-accent-soft p-6 text-text-strong shadow-float sm:w-[82%] sm:p-9 lg:mt-16 lg:w-full">
                <div className="rotate-[-1deg] sm:rotate-0">
                  <p className="type-eyebrow text-accent">{otoplasty.eyebrow}</p>
                  <h3 className="mt-5 font-display text-heading-1">{otoplasty.title}</h3>
                  <p className="mt-2 font-accent text-quote text-accent italic">
                    {otoplasty.shortTitle}
                  </p>
                  <p className="mt-6 max-w-[46ch] text-body text-text">{otoplasty.description}</p>
                  <p className="mt-7 text-caption text-text-muted">
                    {otoplasty.details.join(' · ')}
                  </p>
                </div>
              </div>
            )}
            {services.slice(2).map((service) => (
              <article
                key={service.title}
                className="rounded-[var(--radius-xl)] bg-surface p-6 text-text-strong sm:p-9"
              >
                <p className="type-eyebrow text-accent">{service.eyebrow}</p>
                <h3 className="mt-5 font-display text-heading-1">{service.title}</h3>
                <p className="mt-2 font-accent text-quote text-accent italic">
                  {service.shortTitle}
                </p>
                <p className="mt-6 text-body text-text">{service.description}</p>
                <p className="mt-7 text-caption text-text-muted">{service.details.join(' · ')}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
