import type { Locale } from './config';
import type { Dictionary } from './dictionaries/ko';

const dictionaries: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  ko: () => import('./dictionaries/ko'),
  en: () => import('./dictionaries/en'),
  ja: () => import('./dictionaries/ja'),
  zh: () => import('./dictionaries/zh'),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const mod = await dictionaries[locale]();
  return mod.default;
}

import ko from './dictionaries/ko';
import en from './dictionaries/en';
import ja from './dictionaries/ja';
import zh from './dictionaries/zh';

const dictionaryMap: Record<Locale, Dictionary> = { ko, en, ja, zh };

export function getDictionarySync(locale: Locale): Dictionary {
  return dictionaryMap[locale];
}
