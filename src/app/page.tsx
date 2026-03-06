import HomeClient from './HomeClient';
import ko from '@/i18n/dictionaries/ko';

export default function Home() {
  const dict = ko;

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

      <HomeClient locale="ko" />

      {/* Bottom SEO Text */}
      <section className="mt-16 text-center">
        <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          {dict.home.seoText}
        </p>
      </section>
    </main>
  );
}
