import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { getDictionarySync } from '@/i18n/get-dictionary';
import { createMetadata } from '@/lib/metadata';
import HomeClient from '../HomeClient';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const dict = getDictionarySync(locale as Locale);

  const descriptions: Record<string, string> = {
    en: 'Free online developer tools — JSON formatter, Base64 encoder, regex tester and more, all in one place.',
    ja: '開発者のための無料オンラインツール — JSONフォーマッター、Base64エンコーダー、正規表現テスターなど。',
    zh: '免费在线开发者工具 — JSON格式化、Base64编码、正则表达式测试等，一站式工具集。',
  };

  return createMetadata({
    title: `DevDogu — ${dict.home.heroTitle1} ${dict.home.heroTitle2}`,
    description: descriptions[locale] ?? descriptions.en,
    path: '',
    locale: locale as Locale,
  });
}

export default async function LocaleHome({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const dict = getDictionarySync(locale as Locale);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/10 text-brand-500 rounded-full text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
          {dict.home.badge}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {dict.home.heroTitle1}
          <br />
          <span className="text-brand-500">{dict.home.heroTitle2}</span>
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto whitespace-pre-line">
          {dict.home.heroDescription}
        </p>
      </section>

      <HomeClient locale={locale as Locale} />

      {/* Bottom SEO Text */}
      <section className="mt-16 text-center">
        <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          {dict.home.seoText}
        </p>
      </section>
    </main>
  );
}
