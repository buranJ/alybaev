import { HeroManifesto } from '@/widgets/hero';
import { SiteHeader } from '@/widgets/site-header';

export default function HeroManifestoPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroManifesto />
      </main>
    </>
  );
}
