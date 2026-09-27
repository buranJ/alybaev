import { z } from 'zod';

import { siteConfig } from '@/shared/config/site';

const navItemSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(2),
  /** Абсолютные якоря работают и на главной, и на внутренних страницах. */
  href: z.string().regex(/^\/#[a-z-]+$/, 'Ссылка меню должна быть якорем вида /#services'),
});

const headerSchema = z.object({
  brand: z.object({
    monogram: z.string().length(2),
    name: z.string().min(2),
    role: z.string().min(2),
  }),
  nav: z.array(navItemSchema).length(8),
  cta: z.object({
    label: z.string().min(2),
    labelShort: z.string().min(2),
    href: z.string().regex(/^\/#[a-z-]+$/),
  }),
  menuEyebrow: z.string().min(2),
});

export type NavItem = z.infer<typeof navItemSchema>;
export type HeaderContent = z.infer<typeof headerSchema>;

const raw = {
  brand: {
    monogram: 'УА',
    name: siteConfig.name,
    role: siteConfig.role,
  },
  nav: [
    { id: 'doctor', label: 'О враче', href: '/#doctor' },
    { id: 'services', label: 'Направления', href: '/#services' },
    { id: 'results', label: 'Результаты', href: '/#results' },
    { id: 'reviews', label: 'Отзывы', href: '/#reviews' },
    { id: 'education', label: 'Образование', href: '/#education' },
    { id: 'recovery', label: 'Восстановление', href: '/#recovery' },
    { id: 'faq', label: 'FAQ', href: '/#faq' },
    { id: 'contacts', label: 'Контакты', href: '/#contacts' },
  ],
  cta: {
    label: 'Записаться на консультацию',
    labelShort: 'Записаться',
    href: '/#booking',
  },
  menuEyebrow: 'Меню',
} satisfies z.input<typeof headerSchema>;

export const headerContent: HeaderContent = headerSchema.parse(raw);
