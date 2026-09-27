import { z } from 'zod';

/**
 * Брендированный телефон: строку в E.164 нельзя перепутать с отображаемой.
 * Бренд навешивает zod — обошлись без `as`.
 */
const phoneE164Schema = z
  .string()
  .regex(/^\+[1-9]\d{7,14}$/, 'Телефон должен быть в формате E.164')
  .brand<'PhoneE164'>();

export type PhoneE164 = z.infer<typeof phoneE164Schema>;

const siteSchema = z.object({
  name: z.string().min(2),
  shortName: z.string().min(2),
  role: z.string().min(2),
  description: z.string().min(20),
  /** Канонический домен, без слеша на конце. */
  url: z.url(),
  locale: z.string(),
  phone: z.object({
    e164: phoneE164Schema,
    display: z.string(),
  }),
  whatsapp: z.url(),
  instagram: z.url(),
  instagramHandle: z.string().startsWith('@'),
  address: z.object({
    country: z.string(),
    city: z.string(),
    street: z.string(),
    full: z.string(),
  }),
  geo: z.object({ lat: z.number(), lng: z.number() }),
});

export type SiteConfig = z.infer<typeof siteSchema>;

const raw = {
  name: 'Урмат Алыбаев',
  shortName: 'Алыбаев',
  role: 'пластический хирург',
  description:
    'Пластический хирург в Бишкеке. Верхняя и нижняя блефаропластика, отопластика. 5+ лет практики, более 3000 операций.',
  url: 'https://alybaev.com',
  locale: 'ru_RU',
  phone: {
    e164: '+996700977277',
    display: '+996 700 977 277',
  },
  whatsapp: 'https://wa.me/996700977277',
  instagram: 'https://instagram.com/dr.alybaev',
  instagramHandle: '@dr.alybaev',
  address: {
    country: 'KG',
    city: 'Бишкек',
    street: 'ул. Насирдина Исанова, 118',
    full: 'Бишкек, ул. Насирдина Исанова, 118',
  },
  geo: { lat: 42.8808777, lng: 74.5918555 },
} satisfies z.input<typeof siteSchema>;

export const siteConfig: SiteConfig = siteSchema.parse(raw);
