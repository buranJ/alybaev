import { ArrowUpRight, Plus } from 'lucide-react';

import { homeContent } from '@/content/home';
import { Container, SectionHeading, buttonVariants } from '@/shared/ui';

export function FaqSection() {
  const { faq, preparation } = homeContent;

  return (
    <section id="faq" className="scroll-mt-24 bg-surface-muted py-(--spacing-section)" aria-labelledby="faq-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4 lg:self-start lg:sticky lg:top-32">
            <SectionHeading id="faq-title" eyebrow="FAQ" title="Коротко о важном перед консультацией" />
            <p className="mt-7 max-w-[38ch] text-body text-text-muted">
              Здесь собраны ответы на частые вопросы. Индивидуальные рекомендации врач даёт только после осмотра.
            </p>
            <div aria-hidden="true" className="mt-14 hidden h-px w-24 bg-accent-line lg:block" />
          </div>
          <div className="lg:col-span-8">
            <div className="border-t border-border-strong">
              {faq.map((item) => (
                <details key={item.question} className="group border-b border-border-strong">
                  <summary className="flex cursor-pointer list-none items-center gap-5 py-7 sm:py-9">
                    <span className="flex-1 font-display text-heading-3 text-text-strong">{item.question}</span>
                    <span className="grid size-11 shrink-0 place-items-center text-accent transition-transform duration-(--duration-base) group-open:rotate-45">
                      <Plus aria-hidden="true" className="size-4" />
                    </span>
                  </summary>
                  <div className="max-w-[62ch] space-y-4 pb-9 text-body text-text-muted sm:pr-16">
                    {item.answer.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 border-y border-border-strong py-10 sm:py-12">
          <div className="grid items-start gap-8 lg:grid-cols-[0.55fr_1.25fr_auto] lg:gap-14">
            <div>
              <span className="type-eyebrow text-accent">{preparation.eyebrow}</span>
              <p className="mt-5 max-w-[15ch] font-display text-heading-3 text-text-strong">Перед операцией</p>
            </div>

            <div>
              <h2 className="max-w-[18ch] font-display text-heading-1 font-light text-text-strong">
                {preparation.title}
              </h2>
              <p className="mt-5 max-w-[54ch] text-body text-text-muted">{preparation.description}</p>
            </div>

            <a
              href={preparation.action.href}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: 'outline', size: 'lg', className: 'lg:mt-2' })}
            >
              {preparation.action.label}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
