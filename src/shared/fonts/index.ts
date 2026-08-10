import { Cormorant_Garamond, Golos_Text, JetBrains_Mono, Onest } from 'next/font/google';

/** Основной текст и интерфейс. */
export const onest = Onest({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400'],
  display: 'swap',
  variable: '--font-onest',
});

/** Плотный UI-текст: кнопки, навигация, подписи. */
export const golos = Golos_Text({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-golos',
});

/** Акцентная антиква — только курсив, только для акцентов. */
export const cormorant = Cormorant_Garamond({
  subsets: ['cyrillic', 'latin'],
  weight: ['400'],
  style: ['italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

/** Технические подписи: индексы, метки, числа. */
export const jetbrains = JetBrains_Mono({
  subsets: ['cyrillic', 'latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-jetbrains',
});

/** Все переменные шрифтов одной строкой — вешается на <body>. */
export const fontVariables = [
  onest.variable,
  golos.variable,
  cormorant.variable,
  jetbrains.variable,
].join(' ');
