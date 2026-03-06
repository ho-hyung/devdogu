import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

export const metadata: Metadata = {
  title: 'DevDogu — 개발자를 위한 무료 온라인 도구 모음',
  description:
    '개발자가 매일 쓰는 온라인 도구를 한 곳에서. JSON 포매터, Base64 인코더, 정규식 테스터, JWT 디코더, Unix 타임스탬프 변환기 등 무료 도구 모음.',
  keywords: [
    '개발자 도구',
    'JSON 포매터',
    'Base64 인코더',
    '정규식 테스터',
    'JWT 디코더',
    '온라인 도구',
    'developer tools',
  ],
  metadataBase: new URL('https://devdogu.vercel.app'),
  verification: {
    google: '4BwlWYrmbmphbhQPFMvskd_odtl7ytDqCp8FOgb-FL0',
    other: {
      'naver-site-verification': ['0cd37ad430edd38f482975b1ac040f23e62b1c9d'],
    },
  },
  openGraph: {
    title: 'DevDogu — 개발자를 위한 무료 온라인 도구 모음',
    description: '개발자가 매일 쓰는 온라인 도구를 한 곳에서.',
    type: 'website',
    locale: 'ko_KR',
  },
  alternates: {
    languages: {
      ko: 'https://devdogu.vercel.app',
      en: 'https://devdogu.vercel.app/en',
      ja: 'https://devdogu.vercel.app/ja',
      zh: 'https://devdogu.vercel.app/zh',
      'x-default': 'https://devdogu.vercel.app',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        {/* Google AdSense */}
        {ADSENSE_ID && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
