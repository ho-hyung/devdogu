'use client';

import { useEffect } from 'react';
import { htmlLang, type Locale } from '@/i18n/config';

export default function LocaleUpdater({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = htmlLang[locale];
  }, [locale]);

  return null;
}
