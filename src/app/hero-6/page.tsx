import { HeroPoster } from '@/widgets/hero';
import { SiteHeader } from '@/widgets/site-header';

export default function HeroPosterPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroPoster />
      </main>
    </>
  );
}
