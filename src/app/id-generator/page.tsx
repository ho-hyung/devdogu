import { createMetadata } from '@/lib/metadata';
import IdGeneratorClient from './IdGeneratorClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: 'UUID/ULID 생성기',
  description:
    '온라인 UUID/ULID 생성기 — UUID v4, ULID, NanoID를 즉시 생성합니다. 벌크 생성(최대 100개) 지원. 서버 전송 없이 브라우저에서 바로 처리.',
  path: '/id-generator',
  keywords: ['UUID 생성기', 'ULID 생성기', 'NanoID', 'UUID v4', '고유 식별자', 'ID generator', '벌크 생성'],
});

const faq = [
  {
    q: 'UUID v4란 무엇인가요?',
    a: 'UUID v4는 128비트 길이의 고유 식별자로, 랜덤하게 생성됩니다. 형식은 xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx이며, 충돌 확률이 극히 낮아 분산 시스템에서 널리 사용됩니다.',
  },
  {
    q: 'ULID는 UUID와 무엇이 다른가요?',
    a: 'ULID(Universally Unique Lexicographically Sortable Identifier)는 타임스탬프가 포함되어 시간순 정렬이 가능합니다. 26자리 Crockford Base32 문자열로, UUID보다 짧고 URL-safe합니다.',
  },
  {
    q: 'NanoID는 무엇인가요?',
    a: 'NanoID는 URL-safe한 고유 ID 생성기입니다. 기본 21자리로 UUID보다 짧으면서도 충분한 고유성을 제공하며, 커스텀 알파벳과 길이 설정이 가능합니다.',
  },
  {
    q: '생성된 ID가 서버로 전송되나요?',
    a: '아니요. 모든 ID는 브라우저의 crypto.getRandomValues()를 사용하여 클라이언트에서 생성됩니다. 서버로 전송되지 않습니다.',
  },
];

export default function IdGeneratorPage() {
  return (
    <ToolLayout toolId="id-generator" faq={faq}>
      <IdGeneratorClient />
    </ToolLayout>
  );
}
