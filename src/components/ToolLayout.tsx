import Link from 'next/link';
import { tools } from '@/lib/tools';
import FavoriteButton from './FavoriteButton';
import RecentToolTracker from './RecentToolTracker';
import type { Locale } from '@/i18n/config';
import { defaultLocale } from '@/i18n/config';
import { getDictionarySync } from '@/i18n/get-dictionary';

interface ToolLayoutProps {
  toolId: string;
  children: React.ReactNode;
  faq?: { q: string; a: string }[];
  locale?: Locale;
}

export default function ToolLayout({ toolId, children, faq, locale = defaultLocale }: ToolLayoutProps) {
  const tool = tools.find((t) => t.id === toolId);
  const relatedTools = tools.filter((t) => t.id !== toolId).slice(0, 4);
  const dict = getDictionarySync(locale);

  const localePath = (path: string) =>
    locale === defaultLocale ? path : `/${locale}${path}`;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <RecentToolTracker toolId={toolId} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-6">
        <Link href={localePath('/')} className="hover:text-[var(--color-text)] transition-colors">
          {dict.toolLayout.home}
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">{tool?.name[locale]}</span>
      </nav>

      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {tool?.name[locale]}
          </h1>
          <FavoriteButton toolId={toolId} />
        </div>
        <p className="text-[var(--color-text-secondary)]">{tool?.description[locale]}</p>
      </div>

      {/* Tool Content */}
      <div className="mb-12">{children}</div>

      {/* FAQ Section - SEO */}
      {faq && faq.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">{dict.toolLayout.faq}</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details
                key={i}
                className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-sm">
                  {item.q}
                  <span className="text-[var(--color-text-secondary)] group-open:rotate-180 transition-transform">
                    ↓
                  </span>
                </summary>
                <div className="px-4 pb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools */}
      <section>
        <h2 className="text-lg font-semibold mb-4">{dict.toolLayout.relatedTools}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {relatedTools.map((t) => (
            <Link key={t.id} href={localePath(t.href)} className="tool-card group">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-brand-500 bg-brand-500/10 rounded-md px-2 py-1">
                  {t.icon}
                </span>
                <div>
                  <div className="font-medium text-sm group-hover:text-brand-500 transition-colors">
                    {t.name[locale]}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)] mt-0.5 line-clamp-1">
                    {t.description[locale]}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
