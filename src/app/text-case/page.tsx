import { createMetadata } from '@/lib/metadata';
import TextCaseClient from './TextCaseClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: '텍스트 케이스 변환기',
  description:
    '온라인 텍스트 케이스 변환기 — camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE 등 다양한 케이스를 한 번에 변환합니다.',
  path: '/text-case',
  keywords: ['텍스트 변환', 'camelCase', 'PascalCase', 'snake_case', 'kebab-case', 'text case converter', '케이스 변환'],
});

const faq = [
  {
    q: 'camelCase와 PascalCase의 차이는 무엇인가요?',
    a: 'camelCase는 첫 단어를 소문자로 시작하고 이후 단어의 첫 글자를 대문자로 씁니다(예: myVariableName). PascalCase는 모든 단어의 첫 글자를 대문자로 씁니다(예: MyVariableName). camelCase는 주로 변수명과 함수명에, PascalCase는 클래스명과 컴포넌트명에 사용됩니다.',
  },
  {
    q: 'snake_case와 kebab-case는 어디에서 주로 사용되나요?',
    a: 'snake_case는 Python, Ruby, 데이터베이스 컬럼명에서 주로 사용됩니다. kebab-case는 URL 경로, CSS 클래스명, HTML 속성명, 파일명 등에 많이 사용됩니다.',
  },
  {
    q: 'CONSTANT_CASE는 무엇인가요?',
    a: 'CONSTANT_CASE(또는 UPPER_SNAKE_CASE)는 모든 글자를 대문자로 쓰고 단어 사이를 밑줄(_)로 구분하는 방식입니다. 주로 상수(constant) 값을 정의할 때 사용됩니다(예: MAX_RETRY_COUNT, API_BASE_URL).',
  },
  {
    q: 'dot.case는 어디에서 사용되나요?',
    a: 'dot.case는 주로 Java 패키지명(com.example.app), 설정 파일의 키(server.port), 객체 프로퍼티 접근 표기 등에 사용됩니다.',
  },
  {
    q: '입력한 텍스트는 어디에 저장되나요?',
    a: '모든 변환은 브라우저에서 클라이언트 측으로만 처리되며, 입력한 텍스트는 어떤 서버로도 전송되지 않습니다. 안심하고 사용하세요.',
  },
  {
    q: 'Title Case와 Sentence case의 차이는 무엇인가요?',
    a: 'Title Case는 모든 단어의 첫 글자를 대문자로 씁니다(예: Hello World). Sentence case는 첫 번째 단어의 첫 글자만 대문자로 쓰고 나머지는 소문자입니다(예: Hello world).',
  },
];

export default function TextCasePage() {
  return (
    <ToolLayout toolId="text-case" faq={faq}>
      <TextCaseClient />
    </ToolLayout>
  );
}
