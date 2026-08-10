import { HeroEditorial } from '@/widgets/hero';
import { SiteHeader } from '@/widgets/site-header';

export default function HeroEditorialPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroEditorial />
      </main>
    </>
  );
}
