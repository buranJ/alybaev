import { z } from 'zod';

import config from '../../../../public/admin/config.json';
import { homeContent, homeSchema } from '@/content/home';
import { heroContent, heroSchema } from '@/content/hero';
import { headerContent, headerSchema } from '@/content/header';
import { siteConfig, siteSchema } from '@/shared/config/site';

import type { AdminEntry, ContentData } from './types';

const data: Record<string, ContentData> = {
  site: siteConfig,
  hero: heroContent,
  navigation: { nav: headerContent.nav, cta: headerContent.cta },
  about: homeContent.about,
  services: homeContent.servicesSection,
  results: homeContent.resultsSection,
  reviews: homeContent.reviewsSection,
  certificates: homeContent.certificatesSection,
  faq: homeContent.faqSection,
  preparation: homeContent.preparation,
  links: homeContent.links,
  media: homeContent.media,
  recovery: homeContent.recovery,
  contact: homeContent.contact,
  footer: homeContent.footer,
};

export const contentSchemas: Record<string, z.ZodType> = {
  site: siteSchema,
  hero: heroSchema,
  navigation: headerSchema.pick({ nav: true, cta: true }),
  about: homeSchema.shape.about,
  services: homeSchema.shape.servicesSection,
  results: homeSchema.shape.resultsSection,
  reviews: homeSchema.shape.reviewsSection,
  certificates: homeSchema.shape.certificatesSection,
  faq: homeSchema.shape.faqSection,
  preparation: homeSchema.shape.preparation,
  links: homeSchema.shape.links,
  media: homeSchema.shape.media,
  recovery: homeSchema.shape.recovery,
  contact: homeSchema.shape.contact,
  footer: homeSchema.shape.footer,
};

export const adminEntries: AdminEntry[] = config.collections.flatMap((group) =>
  group.files.map((file) => ({ ...file, group: group.label, data: data[file.name] ?? {} })),
);
