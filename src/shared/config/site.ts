/**
 * Единственный источник правды по контактам и идентичности проекта.
 *
 * ВНИМАНИЕ: значения ниже — заглушки. Бриф не был получен, реальные контакты
 * выдумывать нельзя. Заменить перед первым деплоем; форма и типы финальные.
 */

export interface SiteGeo {
  readonly lat: number;
  readonly lng: number;
}

export interface SiteAddress {
  readonly country: string;
  readonly city: string;
  readonly street: string;
  readonly postalCode: string;
  /** Готовая строка для вывода одной строкой. */
  readonly full: string;
}

export interface SitePhone {
  /** Строго E.164: «+» и цифры, без пробелов и скобок. */
  readonly e164: `+${number}`;
  /** Человекочитаемый вид для вёрстки. */
  readonly display: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly shortName: string;
  readonly description: string;
  /** Канонический домен, без слеша на конце. */
  readonly url: string;
  readonly locale: string;
  readonly phone: SitePhone;
  readonly whatsapp: string;
  readonly instagram: string;
  readonly address: SiteAddress;
  readonly geo: SiteGeo;
}

// TODO(бриф): заменить на реальные данные.
const PHONE_E164 = '+70000000000' as const;

export const siteConfig: SiteConfig = {
  name: 'PROJECT_NAME',
  shortName: 'PROJECT',
  description: 'TODO: описание проекта из брифа.',
  url: 'https://example.com',
  locale: 'ru_RU',
  phone: {
    e164: PHONE_E164,
    display: '+7 000 000-00-00',
  },
  whatsapp: `https://wa.me/${PHONE_E164.replace('+', '')}`,
  instagram: 'https://instagram.com/PROJECT_HANDLE',
  address: {
    country: 'RU',
    city: 'TODO',
    street: 'TODO',
    postalCode: '000000',
    full: 'TODO: адрес из брифа',
  },
  geo: {
    lat: 0,
    lng: 0,
  },
};
