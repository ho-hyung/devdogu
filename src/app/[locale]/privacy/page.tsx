import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { createMetadata } from '@/lib/metadata';

const content: Record<Exclude<Locale, 'ko'>, {
  title: string;
  metaDesc: string;
  heading: string;
  lastUpdated: string;
  sections: { title: string; content: string; list?: string[] }[];
}> = {
  en: {
    title: 'Privacy Policy',
    metaDesc: 'DevDogu Privacy Policy',
    heading: 'Privacy Policy',
    lastUpdated: 'Last updated: March 2026',
    sections: [
      { title: '1. Overview', content: 'DevDogu ("Service") values user privacy and complies with applicable laws. This privacy policy explains what information we collect and how we use it.' },
      { title: '2. Information We Collect', content: 'All DevDogu tools run client-side (in the browser), and user input data is never sent to servers. However, the following information may be automatically collected for service improvement and advertising:', list: ['Visited page URLs', 'Browser type and operating system', 'Access date and time', 'Cookie information'] },
      { title: '3. Cookies & Advertising', content: 'This service uses Google AdSense to display advertisements. Google may use cookies to serve ads based on previous visits. You can manage Google advertising cookies in Google Ad Settings.' },
      { title: '4. Third-Party Sharing', content: 'DevDogu does not sell or provide collected information to third parties, except as required by law.' },
      { title: '5. Analytics', content: 'Google Analytics may be used to analyze service usage. Information collected through this is processed according to Google\'s privacy policy.' },
      { title: '6. Contact', content: 'For privacy-related inquiries, please contact us through GitHub Issues.' },
    ],
  },
  ja: {
    title: 'プライバシーポリシー',
    metaDesc: 'DevDogu プライバシーポリシー',
    heading: 'プライバシーポリシー',
    lastUpdated: '最終更新: 2026年3月',
    sections: [
      { title: '1. 概要', content: 'DevDogu（以下「サービス」）は利用者のプライバシーを重視し、関連法令を遵守します。本プライバシーポリシーはサービスがどの情報を収集し、どのように活用するかを説明します。' },
      { title: '2. 収集する情報', content: 'DevDoguのすべてのツールはクライアント（ブラウザ）で動作し、ユーザーが入力したデータはサーバーに送信されません。ただし、サービス改善および広告提供のため、以下の情報が自動的に収集される場合があります：', list: ['訪問ページURL', 'ブラウザの種類とOS', 'アクセス日時', 'Cookie情報'] },
      { title: '3. CookieおよびGi告', content: '本サービスはGoogle AdSenseを使用して広告を掲載しています。Googleはcookieを使用して以前の訪問記録に基づいて広告を表示する場合があります。Google広告cookieはGoogle広告設定ページで管理できます。' },
      { title: '4. 第三者への提供', content: 'DevDoguは収集した情報を第三者に販売または提供しません。ただし、法律により要求される場合は例外とします。' },
      { title: '5. 分析ツール', content: 'サービス利用状況の分析のためにGoogle Analyticsを使用する場合があります。これにより収集される情報はGoogleのプライバシーポリシーに従って処理されます。' },
      { title: '6. お問い合わせ', content: 'プライバシーに関するお問い合わせはGitHub Issuesからお知らせください。' },
    ],
  },
  zh: {
    title: '隐私政策',
    metaDesc: 'DevDogu 隐私政策',
    heading: '隐私政策',
    lastUpdated: '最后更新：2026年3月',
    sections: [
      { title: '1. 概述', content: 'DevDogu（以下简称"服务"）重视用户隐私，遵守相关法律法规。本隐私政策说明服务收集哪些信息以及如何使用这些信息。' },
      { title: '2. 收集的信息', content: 'DevDogu的所有工具在客户端（浏览器）中运行，用户输入的数据不会发送到服务器。但是，为了服务改进和广告投放，以下信息可能会被自动收集：', list: ['访问页面URL', '浏览器类型和操作系统', '访问日期和时间', 'Cookie信息'] },
      { title: '3. Cookie和广告', content: '本服务使用Google AdSense投放广告。Google可能会使用Cookie根据您的浏览记录展示广告。您可以在Google广告设置页面管理Google广告Cookie。' },
      { title: '4. 第三方共享', content: 'DevDogu不会向第三方出售或提供收集的信息。但法律要求的情况除外。' },
      { title: '5. 分析工具', content: '可能会使用Google Analytics分析服务使用情况。通过此收集的信息按照Google的隐私政策进行处理。' },
      { title: '6. 联系我们', content: '如有隐私相关问题，请通过GitHub Issues联系我们。' },
    ],
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
    path: '/privacy',
    locale: locale as Locale,
  });
}

export default async function LocalePrivacyPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const c = content[locale as Exclude<Locale, 'ko'>];

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6">{c.heading}</h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-8">{c.lastUpdated}</p>

      <div className="space-y-8 text-[var(--color-text-secondary)] leading-relaxed text-sm">
        {c.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">{section.title}</h2>
            <p>{section.content}</p>
            {section.list && (
              <ul className="list-disc list-inside mt-2 space-y-1">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
