import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const entries = [
  ['site', 'Название, контакты и SEO', 'settings', '/'],
  ['navigation', 'Меню и запись', 'settings', '/'],
  ['footer', 'Подвал сайта', 'settings', '/#contacts'],
  ['links', 'Видео и карты', 'settings', '/'],
  ['hero', 'Главный экран', 'pages', '/'],
  ['about', 'О враче', 'pages', '/#doctor'],
  ['services', 'Направления', 'pages', '/#services'],
  ['results', 'Фотографии работ', 'pages', '/#results'],
  ['reviews', 'Отзывы', 'pages', '/#reviews'],
  ['media', 'Философия, видео и Instagram', 'pages', '/#philosophy-title'],
  ['certificates', 'Сертификаты', 'pages', '/ser#main-content'],
  ['recovery', 'Восстановление', 'pages', '/#recovery'],
  ['faq', 'Частые вопросы', 'pages', '/#faq'],
  ['preparation', 'Памятка перед операцией', 'pages', '/#faq'],
  ['contact', 'Запись на консультацию', 'pages', '/#contacts'],
];

const labels = {
  name: 'Имя',
  shortName: 'Короткое имя',
  role: 'Специализация',
  description: 'Описание',
  url: 'Основной адрес сайта',
  locale: 'Локаль для SEO',
  logo: 'Логотип',
  crop: 'Кадрировать оригинальный логотип',
  phone: 'Телефон',
  e164: 'Номер для звонка',
  display: 'Номер на сайте',
  whatsapp: 'Ссылка WhatsApp',
  instagram: 'Instagram',
  instagramHandle: 'Имя профиля с @',
  address: 'Адрес клиники',
  country: 'Код страны',
  city: 'Город',
  street: 'Улица и дом',
  full: 'Полный адрес',
  geo: 'Координаты',
  lat: 'Широта',
  lng: 'Долгота',
  nav: 'Пункты меню',
  id: 'Блок сайта',
  label: 'Подпись',
  href: 'Ссылка',
  cta: 'Кнопка записи',
  labelShort: 'Короткая подпись',
  creditLabel: 'Подпись разработчика',
  creditName: 'Имя разработчика',
  creditUrl: 'Сайт разработчика',
  title: 'Заголовок',
  eyebrow: 'Надзаголовок',
  titleLines: 'Строки заголовка',
  quoteLabel: 'Подпись цитаты',
  quoteLines: 'Строки цитаты',
  quoteNote: 'Текст под цитатой',
  stats: 'Статистика',
  value: 'Значение',
  note: 'Примечание',
  image: 'Фотография',
  src: 'Изображение',
  alt: 'Описание изображения',
  proceduresLabel: 'Подпись направлений',
  paragraphs: 'Абзацы',
  principles: 'Принципы работы',
  principlesLabel: 'Заголовок принципов',
  milestones: 'Образование и события',
  year: 'Год',
  imageLabel: 'Подпись на изображении',
  items: 'Карточки',
  shortTitle: 'Подзаголовок',
  details: 'Особенности',
  instagramLabel: 'Подпись Instagram',
  allLabel: 'Подпись «Все работы»',
  archiveLabel: 'Подпись архива',
  swipeLabel: 'Подсказка для перелистывания',
  caseLabel: 'Подпись случая',
  disclaimer: 'Текст под фотографией',
  procedure: 'Название процедуры',
  text: 'Текст',
  question: 'Вопрос',
  answer: 'Абзацы ответа',
  action: 'Кнопка',
  asideTitle: 'Боковой заголовок',
  orientation: 'Ориентация документа',
  actionLabel: 'Подпись кнопки галереи',
  galleryTitle: 'Заголовок страницы галереи',
  galleryDescription: 'Описание страницы галереи',
  dossierEyebrow: 'Надзаголовок досье',
  dossierTitle: 'Заголовок досье',
  backLabel: 'Подпись возврата на главную',
  twoGis: 'Карта',
  clinicTwoGis: 'Страница клиники на карте',
  video: 'Видео',
  philosophy: 'Философия врача',
  signature: 'Подпись врача',
  caption: 'Подпись на видео',
  mobileTitle: 'Заголовок на телефоне',
  buttonLabel: 'Подпись кнопки',
  images: 'Фотографии',
  subtitle: 'Подзаголовок',
  faqLabel: 'Подпись ссылки на FAQ',
  notesLabel: 'Заголовок примечаний',
  stages: 'Этапы восстановления',
  period: 'Срок',
  notes: 'Примечания',
  mobileTitleLines: 'Строки заголовка на телефоне',
  whatsappText: 'Готовое сообщение для WhatsApp',
  phoneLabel: 'Подпись телефона',
  whatsappLabel: 'Подпись WhatsApp',
  administratorLabel: 'Текст ссылки администратору',
  addressLabel: 'Подпись адреса',
  mapLabel: 'Подпись карты',
  clinic: 'Название клиники',
};

const blocks = [
  'doctor',
  'services',
  'results',
  'reviews',
  'education',
  'recovery',
  'faq',
  'contacts',
];
const exactLists = { 'hero.stats': 2, 'media.instagram.images': 4 };
const lineLists = ['titleLines', 'quoteLines', 'mobileTitleLines'];
const longText = ['description', 'text', 'disclaimer', 'whatsappText', 'paragraphs', 'answer'];

function field(name, value, keyPath) {
  const base = { name, label: labels[name] ?? name, required: true };
  if (Array.isArray(value)) {
    const first =
      value[0] ??
      (keyPath === 'about.milestones'
        ? { year: '', title: '', description: '', href: '' }
        : undefined);
    const exact = exactLists[keyPath];
    const list = { ...base, widget: 'list', collapsed: true, min: exact ?? 1, default: value };
    if (keyPath === 'about.milestones') {
      list.min = 0;
      list.required = false;
    }
    if (exact) list.max = exact;
    if (lineLists.includes(name)) list.max = 4;
    if (keyPath === 'navigation.nav') list.max = 8;
    if (first && typeof first === 'object') {
      list.fields = Object.entries(first).map(([key, item]) =>
        field(key, item, `${keyPath}.${key}`),
      );
      const summaryKey = ['title', 'procedure', 'question', 'label', 'alt'].find(
        (key) => key in first,
      );
      if (summaryKey) list.summary = `{{fields.${summaryKey}}}`;
    } else {
      list.field = {
        name: 'value',
        label: 'Текст',
        widget: longText.includes(name) ? 'text' : 'string',
        required: true,
        pattern: ['\\S', 'Текст не может быть пустым'],
      };
    }
    return list;
  }
  if (value && typeof value === 'object') {
    return {
      ...base,
      widget: 'object',
      collapsed: true,
      fields: Object.entries(value).map(([key, item]) => field(key, item, `${keyPath}.${key}`)),
    };
  }
  if (typeof value === 'boolean')
    return {
      ...base,
      widget: 'boolean',
      default: value,
      ...(keyPath === 'site.logo.crop'
        ? {
            hint: 'Включено для текущего квадратного SVG. Для нового логотипа без полей выключите кадрирование.',
          }
        : {}),
    };
  if (typeof value === 'number')
    return {
      ...base,
      widget: 'number',
      value_type: 'float',
      min: name === 'lat' ? -90 : -180,
      max: name === 'lat' ? 90 : 180,
    };
  if (name === 'orientation')
    return {
      ...base,
      widget: 'select',
      options: [
        { label: 'Горизонтальный', value: 'landscape' },
        { label: 'Вертикальный', value: 'portrait' },
      ],
    };
  if (keyPath === 'navigation.nav.id') return { ...base, widget: 'select', options: blocks };
  if (keyPath === 'navigation.nav.href' || keyPath === 'navigation.cta.href')
    return { ...base, widget: 'select', options: [...blocks, 'booking'].map((id) => `/#${id}`) };
  if (name === 'src')
    return {
      ...base,
      widget: 'image',
      hint: 'Выберите фото из медиатеки или загрузите новое. JPG, PNG, WebP; для логотипа также SVG.',
      pattern: ['^/images/[^?#]+$', 'Выберите файл из медиатеки сайта'],
    };
  const result = {
    ...base,
    widget: longText.includes(name) ? 'text' : 'string',
    pattern: ['\\S', 'Текст не может быть пустым'],
  };
  if (name === 'e164') result.pattern = ['^\\+[1-9]\\d{7,14}$', 'Пример: +996700977277'];
  if (name === 'instagramHandle') result.pattern = ['^@\\S+$', 'Пример: @dr.alybaev'];
  if (name === 'href')
    result.pattern = [
      '^(https://[^\\s]+|/(?!/)[^\\s]*|#[a-zA-Z][\\w-]*)$',
      'Введите HTTPS-ссылку или путь на сайте',
    ];
  if (
    ['url', 'whatsapp', 'creditUrl', 'twoGis', 'clinicTwoGis'].includes(name) ||
    keyPath === 'links.video' ||
    keyPath === 'site.instagram'
  )
    result.pattern = ['^https://[^\\s]+$', 'Ссылка должна начинаться с https://'];
  return result;
}

const collections = [
  { name: 'pages', label: 'Блоки сайта', files: [] },
  { name: 'settings', label: 'Настройки сайта', files: [] },
];
for (const [name, label, group, preview_path] of entries) {
  const content = JSON.parse(await readFile(new URL(`content/${name}.json`, root), 'utf8'));
  collections
    .find((collection) => collection.name === group)
    .files.push({
      name,
      label,
      file: `content/${name}.json`,
      format: 'json',
      preview_path,
      fields: Object.entries(content).map(([key, value]) => field(key, value, `${name}.${key}`)),
    });
}

const config = {
  app_title: 'Dr. Alybaev — управление сайтом',
  collections,
};

await writeFile(new URL('public/admin/config.json', root), `${JSON.stringify(config, null, 2)}\n`);
console.log(
  `CMS: ${entries.length} разделов. ${fileURLToPath(new URL('public/admin/config.json', root))}`,
);
