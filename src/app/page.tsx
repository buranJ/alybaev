import { HeroSignature } from '@/widgets/hero';
import {
  AboutSection,
  CertificatesSection,
  ContactSection,
  FaqSection,
  MediaSection,
  MobileBookingBar,
  RecoverySection,
  ResultsSection,
  ServicesSection,
  SiteFooter,
} from '@/widgets/home-sections';
import { SiteHeader } from '@/widgets/site-header';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroSignature />
        <AboutSection />
        <ServicesSection />
        <ResultsSection />
        <MediaSection />
        <CertificatesSection />
        <RecoverySection />
        <FaqSection />
        <ContactSection />
      </main>
      <MobileBookingBar />
      <SiteFooter />
    </>
  );
}
