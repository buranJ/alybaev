import { z } from 'zod';

import about from '../../content/about.json';
import services from '../../content/services.json';
import results from '../../content/results.json';
import reviews from '../../content/reviews.json';
import faq from '../../content/faq.json';
import preparation from '../../content/preparation.json';
import certificates from '../../content/certificates.json';
import links from '../../content/links.json';
import media from '../../content/media.json';
import recovery from '../../content/recovery.json';
import contact from '../../content/contact.json';
import footer from '../../content/footer.json';
import {
  actionSchema,
  httpsSchema,
  imageSchema,
  linesSchema,
  textSchema,
} from '@/shared/lib/content-schema';

const sectionWithLines = z.object({ eyebrow: textSchema, titleLines: linesSchema });
const serviceSchema = z.object({
  eyebrow: textSchema,
  title: textSchema,
  shortTitle: textSchema,
  description: textSchema,
  details: z.array(textSchema).min(1),
});
const resultsSchema = sectionWithLines.extend({
  instagramLabel: textSchema,
  allLabel: textSchema,
  archiveLabel: textSchema,
  swipeLabel: textSchema,
  caseLabel: textSchema,
  disclaimer: textSchema,
  items: z.array(imageSchema.extend({ procedure: textSchema })).min(1),
});
const reviewsSchema = z.object({
  eyebrow: textSchema,
  title: textSchema,
  archiveLabel: textSchema,
  items: z.array(z.object({ text: textSchema, procedure: textSchema })).min(1),
});
const faqSchema = z.object({
  eyebrow: textSchema,
  title: textSchema,
  description: textSchema,
  items: z.array(z.object({ question: textSchema, answer: z.array(textSchema).min(1) })).min(1),
});
const certificatesSchema = z.object({
  eyebrow: textSchema,
  title: textSchema,
  description: textSchema,
  actionLabel: textSchema,
  galleryTitle: textSchema,
  galleryDescription: textSchema,
  dossierEyebrow: textSchema,
  dossierTitle: textSchema,
  backLabel: textSchema,
  items: z.array(imageSchema.extend({ orientation: z.enum(['landscape', 'portrait']) })).min(1),
});

export const homeSchema = z.object({
  about: z.object({
    eyebrow: textSchema,
    title: textSchema,
    paragraphs: z.array(textSchema).min(1),
    principles: z.array(textSchema).min(1),
    principlesLabel: textSchema,
    image: imageSchema,
    milestones: z.array(
      z.object({ year: textSchema, title: textSchema, description: textSchema, href: httpsSchema }),
    ),
  }),
  servicesSection: sectionWithLines.extend({
    image: imageSchema,
    imageLabel: textSchema,
    items: z.array(serviceSchema).min(1),
  }),
  resultsSection: resultsSchema,
  reviewsSection: reviewsSchema,
  faqSection: faqSchema,
  certificatesSection: certificatesSchema,
  preparation: z.object({
    eyebrow: textSchema,
    title: textSchema,
    description: textSchema,
    asideTitle: textSchema,
    action: actionSchema,
  }),
  links: z.object({ twoGis: httpsSchema, clinicTwoGis: httpsSchema, video: httpsSchema }),
  media: z.object({
    philosophy: z.object({
      eyebrow: textSchema,
      title: textSchema,
      description: textSchema,
      signature: textSchema,
    }),
    video: z.object({
      eyebrow: textSchema,
      label: textSchema,
      image: imageSchema,
      caption: textSchema,
      title: textSchema,
    }),
    instagram: z.object({
      eyebrow: textSchema,
      title: textSchema,
      mobileTitle: textSchema,
      description: textSchema,
      buttonLabel: textSchema,
      images: z.array(imageSchema.extend({ label: textSchema })).length(4),
    }),
  }),
  recovery: sectionWithLines.extend({
    subtitle: textSchema,
    description: textSchema,
    faqLabel: textSchema,
    notesLabel: textSchema,
    stages: z.array(z.object({ period: textSchema, title: textSchema, text: textSchema })).min(1),
    notes: z.array(textSchema).min(1),
  }),
  contact: z.object({
    eyebrow: textSchema,
    title: textSchema,
    mobileTitleLines: linesSchema,
    description: textSchema,
    buttonLabel: textSchema,
    whatsappText: textSchema,
    phoneLabel: textSchema,
    whatsappLabel: textSchema,
    instagramLabel: textSchema,
    administratorLabel: textSchema,
    addressLabel: textSchema,
    mapLabel: textSchema,
    clinic: textSchema,
  }),
  footer: z.object({
    nav: z.array(actionSchema).min(1),
    creditLabel: textSchema,
    creditName: textSchema,
    creditUrl: httpsSchema,
  }),
});

const parsed = homeSchema.parse({
  about,
  servicesSection: services,
  resultsSection: results,
  reviewsSection: reviews,
  faqSection: faq,
  certificatesSection: certificates,
  preparation,
  links,
  media,
  recovery,
  contact,
  footer,
});

export const homeContent = {
  ...parsed,
  services: parsed.servicesSection.items,
  results: parsed.resultsSection.items,
  reviews: parsed.reviewsSection.items,
  faq: parsed.faqSection.items,
  certificates: parsed.certificatesSection.items,
};
