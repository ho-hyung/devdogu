import { createMetadata } from '@/lib/metadata';
import JsonFormatterClient from './JsonFormatterClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: 'JSON 포매터 & 검증기',
  description:
    '온라인 JSON 포매터 — JSON 데이터를 보기 좋게 정리하고, 구문 오류를 찾아 검증합니다. 서버 전송 없이 브라우저에서 바로 처리.',
  path: '/json-formatter',
  keywords: ['JSON 포매터', 'JSON 정리', 'JSON 검증', 'JSON formatter', 'JSON validator', 'JSON 뷰어'],
});

const faq = [
  {
    q: 'JSON 포매터란 무엇인가요?',
    a: 'JSON 포매터는 압축된 JSON 데이터에 들여쓰기와 줄바꿈을 추가하여 사람이 읽기 쉬운 형태로 변환해주는 도구입니다. 디버깅이나 API 응답 확인 시 유용합니다.',
  },
  {
    q: '입력한 JSON 데이터가 서버로 전송되나요?',
    a: '아니요. DevDogu의 모든 도구는 브라우저에서만 동작합니다. 입력한 데이터는 서버로 전송되지 않으며, 페이지를 닫으면 사라집니다.',
  },
  {
    q: 'JSON과 JavaScript 객체의 차이는 무엇인가요?',
    a: 'JSON은 키를 반드시 큰따옴표("")로 감싸야 하며, 후행 쉼표(trailing comma)를 허용하지 않습니다. 또한 함수나 undefined 같은 JavaScript 고유 값은 포함할 수 없습니다.',
  },
];

export default function JsonFormatterPage() {
  return (
    <ToolLayout toolId="json-formatter" faq={faq}>
      <JsonFormatterClient />
    </ToolLayout>
  );
}
