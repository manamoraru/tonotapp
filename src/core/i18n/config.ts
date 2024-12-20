export const defaultLocale = 'en'; // Язык по умолчанию

export const timeZone = 'Europe/Amsterdam'; // Часовой пояс по умолчанию

// Поддерживаемые языки
export const locales = [defaultLocale, 'ru'] as const;

// Карта языков для отображения в интерфейсе
export const localesMap = [
  { key: 'en', title: 'English' },
  { key: 'ru', title: 'Русский' },
];
