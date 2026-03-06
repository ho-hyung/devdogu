import { Metadata } from 'next';

const SITE_NAME = 'DevDogu';
const SITE_URL = 'https://devdogu.kr'; // 실제 도메인으로 변경
const SITE_DESCRIPTION = '개발자를 위한 무료 온라인 도구 모음 — JSON 포매터, Base64 인코더, 정규식 테스터 등 매일 쓰는 도구를 한 곳에서.';

export function createMetadata({
  title,
  description,
  path = '',
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: ['개발자 도구', '온라인 도구', 'developer tools', ...keywords],
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export { SITE_NAME, SITE_URL, SITE_DESCRIPTION };
