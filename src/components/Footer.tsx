'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, defaultLocale } from '@/i18n/config';
import { getDictionarySync } from '@/i18n/get-dictionary';

export default function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const dict = getDictionarySync(locale);

  const localePath = (path: string) =>
    locale === defaultLocale ? path : `/${locale}${path}`;

  return (
    <footer className="border-t border-[var(--color-border)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-[var(--color-text-secondary)]">
            &copy; {new Date().getFullYear()} DevDogu. {dict.footer.copyright}
          </div>
          <nav className="flex items-center gap-6 text-sm text-[var(--color-text-secondary)]">
            <Link href={localePath('/about')} className="hover:text-[var(--color-text)] transition-colors">
              {dict.footer.about}
            </Link>
            <Link href={localePath('/privacy')} className="hover:text-[var(--color-text)] transition-colors">
              {dict.footer.privacy}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
