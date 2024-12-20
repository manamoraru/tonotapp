import { getRequestConfig } from "next-intl/server";

import { defaultLocale, locales } from "./config";
import { getLocale } from "./locale";
import type { Locale } from "./types";

const i18nRequestConfig = getRequestConfig(async () => {
  const locale = await getLocale() as Locale;

  let messages;
  try {
    messages =
      locale === defaultLocale || !locales.includes(locale)
        ? (await import(`../../../public/locales/${defaultLocale}.json`)).default
        : (await import(`../../../public/locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading locale file for ${locale}:`, error);
    messages = (await import(`../../../public/locales/${defaultLocale}.json`)).default;
  }

  return {
    locale: locales.includes(locale) ? locale : defaultLocale,
    messages,
  };
});

export default i18nRequestConfig;
