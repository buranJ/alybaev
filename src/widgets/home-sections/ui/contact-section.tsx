import { ArrowUpRight, MessageCircle } from 'lucide-react';

import { homeContent } from '@/content/home';
import { siteConfig } from '@/shared/config/site';
import { Container, Eyebrow, buttonVariants } from '@/shared/ui';

const contactItems = [
  {
    label: 'Телефон',
    value: siteConfig.phone.display,
    href: `tel:${siteConfig.phone.e164}`,
  },
  {
    label: 'WhatsApp',
    value: 'Написать администратору',
    href: siteConfig.whatsapp,
  },
  {
    label: 'Instagram',
    value: siteConfig.instagramHandle,
    href: siteConfig.instagram,
  },
] as const;

export function ContactSection() {
  return (
    <section id="contacts" className="scroll-mt-24 py-(--spacing-section)" aria-labelledby="contact-title">
      <Container>
        <div id="booking" className="scroll-mt-24 border-y border-border">
          <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <Eyebrow showDot={false} className="text-accent">
                Очный приём в Бишкеке
              </Eyebrow>
              <h2 id="contact-title" className="mt-6 font-display text-display-lg font-light text-text-strong sm:max-w-[11ch]">
                <span className="sm:hidden">
                  <span className="block whitespace-nowrap">Начнём с личного</span>
                  <span className="block">разговора</span>
                </span>
                <span className="hidden sm:inline">Начнём с личного разговора</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="max-w-[52ch] text-body-lg text-text-muted">
                Напишите администратору в WhatsApp. Вам помогут выбрать время консультации и ответят на организационные вопросы.
              </p>
              <a
                href={`${siteConfig.whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу записаться на консультацию к доктору Алыбаеву.')}`}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: 'primary', size: 'lg', className: 'mt-8' })}
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                Записаться в WhatsApp
              </a>
            </div>
          </div>

          <div className="grid border-b border-border sm:grid-cols-2 lg:grid-cols-5">
            {contactItems.map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex min-h-32 flex-col justify-between gap-8 border-b border-border py-7 sm:px-6 sm:odd:border-r lg:border-r lg:border-b-0 lg:first:pl-0"
              >
                <span className="type-eyebrow text-text-muted">{label}</span>
                <span className="flex items-end justify-between gap-4 text-body-sm font-medium text-text-strong">
                  {value}
                  <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-accent transition-transform group-hover:rotate-45" />
                </span>
              </a>
            ))}

            <a
              href={homeContent.links.clinicTwoGis}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-32 flex-col justify-between gap-8 py-7 sm:col-span-2 lg:col-span-2 lg:pl-10"
            >
              <span className="type-eyebrow text-text-muted">Адрес клиники</span>
              <span className="flex items-end justify-between gap-5">
                <span>
                  <span className="block text-body-sm font-medium text-text-strong">{siteConfig.address.full}</span>
                  <span className="mt-1 block text-caption text-text-muted">Green Clinic</span>
                </span>
                <span className="flex shrink-0 items-center gap-2 text-caption text-accent">
                  2GIS
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:rotate-45" />
                </span>
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
