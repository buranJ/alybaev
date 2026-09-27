import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { homeContent } from '@/content/home';
import { Container, buttonVariants } from '@/shared/ui';

export function CertificatesSection() {
  const preview = homeContent.certificates.slice(0, 4);

  return (
    <section id="education" className="scroll-mt-24 overflow-hidden bg-surface-muted py-(--spacing-section)" aria-labelledby="certificates-title">
      <Container>
        <div className="max-w-3xl text-left sm:mx-auto sm:text-center">
          <p className="type-eyebrow text-accent">Образование</p>
          <h2 id="certificates-title" className="mt-6 font-display text-display-lg font-light text-text-strong">
            Обучение, которое стоит за практикой
          </h2>
          <p className="mt-6 max-w-[58ch] text-body text-text-muted sm:mx-auto">
            Сертификаты и документы о профессиональном развитии можно открыть и рассмотреть в полном размере.
          </p>
        </div>

        <div className="relative mt-12 h-[18rem] sm:hidden">
          {preview.slice(0, 2).map((certificate, index) => (
            <a
              key={certificate.src}
              href={certificate.src}
              target="_blank"
              rel="noreferrer"
              className={`absolute aspect-[4/3] overflow-hidden border border-border bg-surface shadow-card ${index === 0 ? 'top-0 left-0 z-10 w-[74%] -rotate-5' : 'top-8 right-0 z-20 w-[86%] rotate-2'}`}
              aria-label={`Открыть: ${certificate.alt}`}
            >
              <Image src={certificate.src} alt={certificate.alt} fill sizes="78vw" className="object-contain p-3" />
            </a>
          ))}
        </div>

        <div className="mt-14 hidden items-center gap-4 overflow-x-auto pt-5 pb-8 sm:-mx-8 sm:flex sm:px-8 lg:mx-auto lg:max-w-5xl lg:justify-center lg:gap-0 lg:overflow-visible lg:px-0 lg:py-10">
          {preview.map((certificate, index) => (
            <a
              key={certificate.src}
              href={certificate.src}
              target="_blank"
              rel="noreferrer"
              className={`group relative shrink-0 overflow-hidden border border-border bg-surface shadow-card transition-transform duration-(--duration-slow) hover:z-20 hover:-translate-y-3 hover:rotate-0 lg:-ml-8 lg:first:ml-0 ${certificate.orientation === 'portrait' ? 'aspect-[3/4] w-[64vw] max-w-72 sm:w-[34vw]' : 'aspect-[4/3] w-[82vw] max-w-96 sm:w-[46vw]'} ${index === 0 ? 'lg:-rotate-3' : ''} ${index === 1 ? 'lg:z-10 lg:rotate-2' : ''} ${index === 2 ? 'lg:-rotate-1' : ''} ${index === 3 ? 'lg:rotate-3' : ''}`}
              aria-label={`Открыть: ${certificate.alt}`}
            >
              <Image
                src={certificate.src}
                alt={certificate.alt}
                fill
                sizes="(min-width: 1024px) 24vw, 82vw"
                className="object-contain p-3 sm:p-4"
              />
            </a>
          ))}
        </div>

        <div className="relative z-30 mt-6 flex justify-center">
          <Link href="/ser#main-content" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            Открыть всю галерею
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
