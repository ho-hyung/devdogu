export const locales = ['ko', 'en', 'ja', 'zh'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export const nonDefaultLocales = locales.filter((l): l is Exclude<Locale, 'ko'> => l !== defaultLocale);

export const localeNames: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
};

export const htmlLang: Record<Locale, string> = {
  ko: 'ko',
  en: 'en',
  ja: 'ja',
  zh: 'zh-CN',
};

export const ogLocale: Record<Locale, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  ja: 'ja_JP',
  zh: 'zh_CN',
};

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const first = segments[1];
  if ((nonDefaultLocales as readonly string[]).includes(first)) return first as Locale;
  return defaultLocale;
}

export function getPathWithLocale(pathname: string, targetLocale: Locale): string {
  const currentLocale = getLocaleFromPathname(pathname);

  let basePath: string;
  if (currentLocale === defaultLocale) {
    basePath = pathname;
  } else {
    basePath = pathname.replace(`/${currentLocale}`, '') || '/';
  }

  if (targetLocale === defaultLocale) return basePath;
  return `/${targetLocale}${basePath}`;
}

export function getBasePathFromLocale(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (locale === defaultLocale) return pathname;
  return pathname.replace(`/${locale}`, '') || '/';
}
