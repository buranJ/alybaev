import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Container, buttonVariants } from '@/shared/ui';
import { ContactSection, SiteFooter } from '@/widgets/home-sections';
import { SiteHeader } from '@/widgets/site-header';

import { CertificatesGallery } from './certificates-gallery';

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
              <div className="lg:col-span-4">
                <p className="max-w-[38ch] text-body text-text-muted">Подтверждение обучения и профессионального развития врача.</p>
                <p className="mt-8 type-eyebrow text-accent">10 документов</p>
              </div>
            </div>
          </Container>

          <Container className="mt-16">
            <CertificatesGallery />
          </Container>
        </section>
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
