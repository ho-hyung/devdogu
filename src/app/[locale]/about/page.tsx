import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { createMetadata } from '@/lib/metadata';

const content: Record<Exclude<Locale, 'ko'>, {
  title: string;
  metaDesc: string;
  heading: string;
  intro: string;
  principlesTitle: string;
  principles: { icon: string; title: string; desc: string }[];
  contactTitle: string;
  contactDesc: string;
}> = {
  en: {
    title: 'About',
    metaDesc: 'DevDogu is a free collection of online developer tools.',
    heading: 'About DevDogu',
    intro: 'DevDogu is a free service that brings together online tools developers use every day. We provide frequently used tools like JSON formatter, Base64 encoder, and regex tester with a fast and clean interface.',
    principlesTitle: 'Core Principles',
    principles: [
      { icon: '🔒', title: 'Privacy First', desc: 'All tools run in your browser. Your data is never sent to any server.' },
      { icon: '⚡', title: 'Fast & Lightweight', desc: 'Focused on essentials without unnecessary features. Page load times are minimized.' },
      { icon: '🌙', title: 'Dark Mode Default', desc: 'Protecting developers\' eyes. Freely switch between light and dark modes.' },
      { icon: '🌐', title: 'Multilingual', desc: 'Available in Korean, English, Japanese, and Chinese.' },
    ],
    contactTitle: 'Contact',
    contactDesc: 'For bug reports, feature suggestions, or other inquiries, please let us know through GitHub Issues.',
  },
  ja: {
    title: '紹介',
    metaDesc: 'DevDoguは開発者のための無料オンラインツール集です。',
    heading: 'DevDoguについて',
    intro: 'DevDoguは、開発者が毎日使うオンラインツールを一か所に集めた無料サービスです。JSONフォーマッター、Base64エンコーダー、正規表現テスターなど、よく使うツールを高速でクリーンなインターフェースで提供します。',
    principlesTitle: 'コア原則',
    principles: [
      { icon: '🔒', title: 'プライバシー最優先', desc: 'すべてのツールはブラウザ内で動作します。データはサーバーに送信されません。' },
      { icon: '⚡', title: '高速・軽量', desc: '不要な機能を排除し、コアに集中。ページ読み込み時間を最小化しました。' },
      { icon: '🌙', title: 'ダークモードデフォルト', desc: '開発者の目を保護します。ライト/ダークモードを自由に切り替え可能です。' },
      { icon: '🌐', title: '多言語対応', desc: '韓国語、英語、日本語、中国語に対応しています。' },
    ],
    contactTitle: 'お問い合わせ',
    contactDesc: 'バグ報告、機能提案、その他のお問い合わせはGitHub Issuesからお知らせください。',
  },
  zh: {
    title: '关于',
    metaDesc: 'DevDogu是面向开发者的免费在线工具集。',
    heading: '关于DevDogu',
    intro: 'DevDogu是一个免费服务，将开发者每天使用的在线工具集中在一个地方。我们以快速、简洁的界面提供JSON格式化、Base64编码、正则表达式测试等常用工具。',
    principlesTitle: '核心原则',
    principles: [
      { icon: '🔒', title: '隐私优先', desc: '所有工具在浏览器中运行，数据不会发送到任何服务器。' },
      { icon: '⚡', title: '快速轻量', desc: '专注核心功能，去除不必要的功能。页面加载时间最小化。' },
      { icon: '🌙', title: '默认深色模式', desc: '保护开发者的眼睛。可自由切换亮色和深色模式。' },
      { icon: '🌐', title: '多语言支持', desc: '支持韩语、英语、日语和中文。' },
    ],
    contactTitle: '联系我们',
    contactDesc: '如有bug报告、功能建议或其他问题，请通过GitHub Issues联系我们。',
  },
};

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const c = content[locale as Exclude<Locale, 'ko'>];
  return createMetadata({
    title: c.title,
    description: c.metaDesc,
    path: '/about',
    locale: locale as Locale,
  });
}

export default async function LocaleAboutPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const c = content[locale as Exclude<Locale, 'ko'>];

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6">{c.heading}</h1>

      <div className="prose dark:prose-invert max-w-none space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
        <p>{c.intro}</p>

        <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8">{c.principlesTitle}</h2>

        <div className="space-y-4">
          {c.principles.map((p) => (
            <div key={p.title} className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
              <h3 className="font-semibold text-[var(--color-text)] mb-1">{p.icon} {p.title}</h3>
              <p className="text-sm">{p.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8">{c.contactTitle}</h2>
        <p>{c.contactDesc}</p>
      </div>
    </main>
  );
}
