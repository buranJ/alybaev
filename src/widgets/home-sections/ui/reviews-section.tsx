import { homeContent } from '@/content/home';
import { Container } from '@/shared/ui';

import { ReviewsSlider } from './reviews-slider';

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="scroll-mt-24 overflow-hidden bg-accent-soft py-(--spacing-section) text-text-strong"
      aria-labelledby="reviews-title"
    >
      <Container>
        <div>
          <p className="type-eyebrow text-accent">{homeContent.reviewsSection.eyebrow}</p>
          <h2
            id="reviews-title"
            className="mt-6 font-display text-display-lg font-light text-text-strong"
          >
            {homeContent.reviewsSection.title}
          </h2>
        </div>
        <div className="mt-14">
          <ReviewsSlider cardClassName="bg-surface" />
        </div>
      </Container>
    </section>
  );
}
