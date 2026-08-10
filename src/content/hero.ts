import { z } from 'zod';

const heroSchema = z.object({
  eyebrow: z.string().min(2),
  title: z.object({
    lead: z.string().min(2),
    accent: z.string().min(2),
  }),
  description: z.string().min(20),
  primaryAction: z.object({ label: z.string().min(2), href: z.string().startsWith('#') }),
  secondaryAction: z.object({ label: z.string().min(2), href: z.string().startsWith('#') }),
  stats: z
    .array(
      z.object({
        value: z.string().min(1),
        label: z.string().min(2),
      }),
    )
    .length(3),
  note: z.string().min(2),
  image: z.object({ src: z.string().startsWith('/'), alt: z.string().min(2) }),
});

export type HeroContent = z.infer<typeof heroSchema>;

const raw = {
  eyebrow: 'Пластический хирург · Бишкек',
  title: {
    lead: 'Изменения, которые',
    accent: 'остаются вами',
  },
  description:
    'Блефаропластика и отопластика с вниманием к анатомии, пропорциям и естественному результату.',
  primaryAction: { label: 'Записаться на консультацию', href: '#booking' },
  secondaryAction: { label: 'Смотреть результаты', href: '#results' },
  stats: [
    { value: '5+', label: 'лет практики' },
    { value: '3000+', label: 'проведённых операций' },
    { value: 'Очно', label: 'консультации в Бишкеке' },
  ],
  note: 'План операции — только после личной консультации',
  image: {
    src: '/images/urmat-alybaev.png',
    alt: 'Пластический хирург Урмат Алыбаев',
  },
} satisfies z.input<typeof heroSchema>;

export const heroContent: HeroContent = heroSchema.parse(raw);
