import { z } from 'zod';

import raw from '../../content/navigation.json';
import { siteConfig } from '@/shared/config/site';
import { textSchema } from '@/shared/lib/content-schema';

const navItemSchema = z.object({
  id: textSchema,
  label: textSchema,
  href: z.string().regex(/^\/#[a-z-]+$/, 'Ссылка меню должна быть якорем вида /#services'),
});

export const headerSchema = z.object({
  brand: z.object({ monogram: textSchema, name: textSchema, role: textSchema }),
  nav: z.array(navItemSchema).min(1).max(8),
  cta: z.object({
    label: textSchema,
    labelShort: textSchema,
    href: z.string().regex(/^\/#[a-z-]+$/),
  }),
  menuEyebrow: textSchema,
});

export type NavItem = z.infer<typeof navItemSchema>;
export type HeaderContent = z.infer<typeof headerSchema>;
export const headerContent: HeaderContent = headerSchema.parse({
  ...raw,
  brand: { monogram: 'УА', name: siteConfig.name, role: siteConfig.role },
  menuEyebrow: 'Меню',
});
