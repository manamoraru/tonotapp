import createNextIntlPlugin from 'next-intl/plugin';

// Подключение next-intl с указанием файла конфигурации для интернационализации
const withNextIntl = createNextIntlPlugin("./src/core/i18n/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {};

// Применение плагина next-intl поверх базового конфигурационного файла
export default withNextIntl(nextConfig);
