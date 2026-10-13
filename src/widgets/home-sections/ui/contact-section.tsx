import { ArrowUpRight, MessageCircle } from 'lucide-react';

import { homeContent } from '@/content/home';
import { siteConfig } from '@/shared/config/site';
import { Container, Eyebrow, buttonVariants } from '@/shared/ui';

const contactItems = [
  {
    label: homeContent.contact.phoneLabel,
    value: siteConfig.phone.display,
    href: `tel:${siteConfig.phone.e164}`,
  },
  {
    label: homeContent.contact.whatsappLabel,
    value: homeContent.contact.administratorLabel,
    href: siteConfig.whatsapp,
  },
  {
    label: homeContent.contact.instagramLabel,
    value: siteConfig.instagramHandle,
    href: siteConfig.instagram,
  },
] as const;

export function ContactSection() {
  return (
    <section
      id="contacts"
      className="scroll-mt-24 py-(--spacing-section)"
      aria-labelledby="contact-title"
    >
      <Container>
        <div id="booking" className="scroll-mt-24 border-y border-border">
          <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <Eyebrow showDot={false} className="text-accent">
                {homeContent.contact.eyebrow}
              </Eyebrow>
              <h2
                id="contact-title"
                className="mt-6 font-display text-display-lg font-light text-text-strong sm:max-w-[11ch]"
              >
                <span className="sm:hidden">
                  {homeContent.contact.mobileTitleLines.map((line, index) => (
                    <span key={index} className="block">
                      {line}
                    </span>
                  ))}
                </span>
                <span className="hidden sm:inline">{homeContent.contact.title}</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="max-w-[52ch] text-body-lg text-text-muted">
                {homeContent.contact.description}
              </p>
              <a
                href={`${siteConfig.whatsapp}?text=${encodeURIComponent(homeContent.contact.whatsappText)}`}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: 'primary', size: 'lg', className: 'mt-8' })}
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                {homeContent.contact.buttonLabel}
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
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-accent transition-transform group-hover:rotate-45"
                  />
                </span>
              </a>
            ))}

            <a
              href={homeContent.links.clinicTwoGis}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-32 flex-col justify-between gap-8 py-7 sm:col-span-2 lg:col-span-2 lg:pl-10"
            >
              <span className="type-eyebrow text-text-muted">
                {homeContent.contact.addressLabel}
              </span>
              <span className="flex items-end justify-between gap-5">
                <span>
                  <span className="block text-body-sm font-medium text-text-strong">
                    {siteConfig.address.full}
                  </span>
                  <span className="mt-1 block text-caption text-text-muted">
                    {homeContent.contact.clinic}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2 text-caption text-accent">
                  {homeContent.contact.mapLabel}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:rotate-45"
                  />
                </span>
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
