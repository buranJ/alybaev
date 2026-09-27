import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { homeContent } from '@/content/home';
import { Container, buttonVariants } from '@/shared/ui';
import { ContactSection, SiteFooter } from '@/widgets/home-sections';
import { SiteHeader } from '@/widgets/site-header';

export const metadata: Metadata = {
  title: 'Сертификаты Урмата Алыбаева',
  description: 'Сертификаты и документы пластического хирурга Урмата Алыбаева.',
};

export default function CertificatesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pt-32 lg:pt-40">
        <section className="pb-(--spacing-section)">
          <Container>
            <Link href="/" className={buttonVariants({ variant: 'ghost', size: 'md', className: 'px-0' })}><ArrowLeft aria-hidden="true" className="size-4" /> На главную</Link>
            <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="type-eyebrow text-accent">Образование</p>
                <h1 className="mt-6 max-w-[10ch] font-display text-display-xl font-light text-text-strong">Сертификаты</h1>
              </div>
              <p className="max-w-[38ch] text-body text-text-muted lg:col-span-4">Подтверждение обучения и профессионального развития врача.</p>
            </div>
            <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3">
              {homeContent.certificates.map((certificate) => (
                <a key={certificate.src} href={certificate.src} target="_blank" rel="noreferrer" className={`group relative mb-5 block break-inside-avoid overflow-hidden rounded-[var(--radius-lg)] bg-surface shadow-card ${certificate.orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'}`} aria-label={`Открыть: ${certificate.alt}`}>
                  <Image src={certificate.src} alt={certificate.alt} fill sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw" className="object-contain p-4 transition-transform duration-(--duration-slow) group-hover:scale-[1.015]" />
                </a>
              ))}
            </div>
          </Container>
        </section>
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
