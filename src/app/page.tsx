import {
  Hero,
  HeroBento,
  HeroEditorial,
  HeroJournal,
  HeroManifesto,
  HeroPoster,
} from '@/widgets/hero';
import { SiteHeader } from '@/widgets/site-header';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <HeroEditorial />
        <HeroJournal />
        <HeroBento />
        <HeroManifesto />
        <HeroPoster />
      </main>
    </>
  );
}
