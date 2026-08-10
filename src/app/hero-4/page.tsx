import { HeroBento } from '@/widgets/hero';
import { SiteHeader } from '@/widgets/site-header';

export default function HeroBentoPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroBento />
      </main>
    </>
  );
}
