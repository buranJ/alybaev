import { z } from 'zod';

import raw from '../../../content/site.json';
import { httpsSchema, imagePathSchema, textSchema } from '@/shared/lib/content-schema';

const phoneE164Schema = z
  .string()
  .regex(/^\+[1-9]\d{7,14}$/, 'Телефон должен быть в формате E.164')
  .brand<'PhoneE164'>();
export type PhoneE164 = z.infer<typeof phoneE164Schema>;

export const siteSchema = z.object({
  name: textSchema,
  shortName: textSchema,
  role: textSchema,
  description: textSchema,
  url: httpsSchema,
  locale: textSchema,
  logo: z.object({ src: imagePathSchema, alt: textSchema, crop: z.boolean() }),
  phone: z.object({ e164: phoneE164Schema, display: textSchema }),
  whatsapp: httpsSchema,
  instagram: httpsSchema,
  instagramHandle: z.string().startsWith('@'),
  address: z.object({
    country: textSchema,
    city: textSchema,
    street: textSchema,
    full: textSchema,
  }),
  geo: z.object({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) }),
});

export type SiteConfig = z.infer<typeof siteSchema>;
export const siteConfig: SiteConfig = siteSchema.parse(raw);
