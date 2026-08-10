import { HeroJournal } from '@/widgets/hero';
import { SiteHeader } from '@/widgets/site-header';

export default function HeroJournalPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroJournal />
      </main>
    </>
  );
}
