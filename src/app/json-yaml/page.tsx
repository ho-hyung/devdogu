import { createMetadata } from '@/lib/metadata';
import JsonYamlClient from './JsonYamlClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: 'JSON ↔ YAML 변환기',
  description:
    '온라인 JSON YAML 변환기 — JSON과 YAML을 실시간으로 상호 변환합니다. 서버 전송 없이 브라우저에서 바로 처리.',
  path: '/json-yaml',
  keywords: ['JSON YAML 변환', 'JSON to YAML', 'YAML to JSON', 'YAML 변환기', 'JSON 변환기', 'YAML converter'],
});

const faq = [
  {
    q: 'JSON과 YAML의 차이점은 무엇인가요?',
    a: 'JSON은 중괄호와 대괄호를 사용하는 데이터 형식이고, YAML은 들여쓰기 기반의 사람이 읽기 쉬운 데이터 형식입니다. YAML은 주석을 지원하고 더 간결한 반면, JSON은 파싱이 빠르고 대부분의 프로그래밍 언어에서 기본 지원됩니다.',
  },
  {
    q: '입력한 데이터가 서버로 전송되나요?',
    a: '아니요. DevDogu의 모든 도구는 브라우저에서만 동작합니다. 입력한 데이터는 서버로 전송되지 않으며, 페이지를 닫으면 사라집니다.',
  },
  {
    q: 'YAML에서 JSON으로 변환할 때 주석은 어떻게 되나요?',
    a: 'JSON은 주석을 지원하지 않기 때문에, YAML에 포함된 주석은 JSON으로 변환 시 제거됩니다. 필요하다면 원본 YAML 파일을 별도로 보관하세요.',
  },
  {
    q: 'YAML에서 들여쓰기는 왜 중요한가요?',
    a: 'YAML은 들여쓰기로 데이터의 계층 구조를 표현합니다. 잘못된 들여쓰기는 파싱 오류를 일으키거나 의도하지 않은 데이터 구조를 만들 수 있습니다. 공백(스페이스)만 사용하고 탭은 사용하지 마세요.',
  },
  {
    q: 'YAML은 어디서 주로 사용되나요?',
    a: 'YAML은 Docker Compose, Kubernetes, GitHub Actions, Ansible 등의 설정 파일에서 널리 사용됩니다. 사람이 읽고 편집하기 쉬워 설정 파일 형식으로 인기가 높습니다.',
  },
  {
    q: 'JSON은 어디서 주로 사용되나요?',
    a: 'JSON은 REST API 응답, package.json, tsconfig.json 등 프로그램 간 데이터 교환과 설정 파일에 널리 사용됩니다. 거의 모든 프로그래밍 언어에서 기본 지원됩니다.',
  },
  {
    q: '큰 파일도 변환할 수 있나요?',
    a: '브라우저에서 처리하므로 매우 큰 파일(수 MB 이상)은 속도가 느려질 수 있습니다. 일반적인 설정 파일 크기에서는 문제없이 동작합니다.',
  },
];

export default function JsonYamlPage() {
  return (
    <ToolLayout toolId="json-yaml" faq={faq}>
      <JsonYamlClient />
    </ToolLayout>
  );
}
