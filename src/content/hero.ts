import { z } from 'zod';

import raw from '../../content/hero.json';
import { imageSchema, linesSchema, textSchema } from '@/shared/lib/content-schema';

export const heroSchema = z.object({
  title: textSchema,
  quoteLabel: textSchema,
  quoteLines: linesSchema,
  quoteNote: textSchema,
  stats: z.array(z.object({ value: textSchema, label: textSchema })).length(2),
  note: textSchema,
  image: imageSchema,
  proceduresLabel: textSchema,
  name: textSchema,
  role: textSchema,
});

export type HeroContent = z.infer<typeof heroSchema>;
export const heroContent: HeroContent = heroSchema.parse(raw);
