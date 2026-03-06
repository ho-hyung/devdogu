import { createMetadata } from '@/lib/metadata';
import Base64Client from './Base64Client';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: 'Base64 인코더/디코더',
  description: '온라인 Base64 인코딩 & 디코딩 도구. 텍스트를 Base64로 변환하거나 Base64를 원래 텍스트로 복원합니다.',
  path: '/base64',
  keywords: ['Base64', '인코딩', '디코딩', 'encode', 'decode', '변환'],
});

const faq = [
  {
    q: 'Base64 인코딩이란 무엇인가요?',
    a: 'Base64는 바이너리 데이터를 ASCII 문자열로 변환하는 인코딩 방식입니다. 이메일 첨부파일, 데이터 URI, JWT 토큰 등에서 널리 사용됩니다.',
  },
  {
    q: 'Base64는 암호화인가요?',
    a: '아니요. Base64는 암호화가 아닌 인코딩입니다. 누구나 쉽게 디코딩할 수 있으므로 민감한 데이터를 보호하는 용도로는 사용하면 안 됩니다.',
  },
];

export default function Base64Page() {
  return (
    <ToolLayout toolId="base64" faq={faq}>
      <Base64Client />
    </ToolLayout>
  );
}
