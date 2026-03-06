'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  locales,
  localeNames,
  getLocaleFromPathname,
  getPathWithLocale,
  type Locale,
} from '@/i18n/config';

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 h-8 px-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] rounded-lg transition-colors"
        aria-label="Language"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        <span>{localeNames[currentLocale]}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-36 py-1 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg shadow-xl z-50">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={getPathWithLocale(pathname, locale as Locale)}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 text-sm transition-colors ${
                locale === currentLocale
                  ? 'text-brand-500 bg-brand-500/10'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]'
              }`}
            >
              {localeNames[locale as Locale]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
