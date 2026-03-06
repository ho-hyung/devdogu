import { createMetadata } from '@/lib/metadata';
import UrlEncoderClient from './UrlEncoderClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: 'URL 인코더/디코더',
  description: '온라인 URL 인코딩 & 디코딩 도구. URL에 포함된 특수문자를 퍼센트 인코딩하거나 원래 문자로 복원합니다.',
  path: '/url-encoder',
  keywords: ['URL 인코딩', 'URL 디코딩', 'percent encoding', 'URL encode', 'URL decode'],
});

const faq = [
  {
    q: 'URL 인코딩은 왜 필요한가요?',
    a: 'URL에는 영문, 숫자, 일부 특수문자만 직접 사용할 수 있습니다. 한글이나 공백 등은 %XX 형태의 퍼센트 인코딩으로 변환해야 브라우저와 서버가 올바르게 처리할 수 있습니다.',
  },
];

export default function UrlEncoderPage() {
  return (
    <ToolLayout toolId="url-encoder" faq={faq}>
      <UrlEncoderClient />
    </ToolLayout>
  );
}
