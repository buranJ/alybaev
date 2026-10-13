import { z } from 'zod';

export const textSchema = z.string().trim().min(1);
export const httpsSchema = z
  .url()
  .refine((url) => new URL(url).protocol === 'https:', 'Ссылка должна начинаться с https://');
export const imagePathSchema = z
  .string()
  .regex(/^\/images\/[^?#\\\u0000-\u001f]+$/, 'Выберите изображение из медиатеки сайта')
  .refine((path) => !path.split('/').includes('..'), 'Некорректный путь изображения');
export const imageSchema = z.object({ src: imagePathSchema, alt: textSchema });
export const linkSchema = z
  .string()
  .regex(
    /^(?:https:\/\/[^\s]+|\/(?!\/)[^\s]*|#[a-zA-Z][\w-]*)$/,
    'Введите HTTPS-ссылку или путь на сайте',
  );
export const actionSchema = z.object({ label: textSchema, href: linkSchema });
export const linesSchema = z.array(textSchema).min(1).max(4);
