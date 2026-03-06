import { createMetadata } from '@/lib/metadata';
import RegexTesterClient from './RegexTesterClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: '정규식 테스터',
  description: '온라인 정규표현식(Regex) 테스터. 정규식을 입력하면 실시간으로 매칭 결과를 확인할 수 있습니다.',
  path: '/regex-tester',
  keywords: ['정규식', 'regex', '정규표현식', 'regular expression', '테스터', '매칭'],
});

const faq = [
  {
    q: '정규표현식이란 무엇인가요?',
    a: '정규표현식(Regular Expression, Regex)은 문자열에서 특정 패턴을 찾거나 치환하기 위한 표현식입니다. 이메일 검증, 전화번호 추출 등에 널리 사용됩니다.',
  },
  {
    q: '자주 사용하는 정규식 패턴은?',
    a: '이메일: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}, 한국 전화번호: 01[016789]-?\\d{3,4}-?\\d{4}, URL: https?://[\\w\\-._~:/?#@!$&\'()*+,;=%]+',
  },
];

export default function RegexTesterPage() {
  return (
    <ToolLayout toolId="regex-tester" faq={faq}>
      <RegexTesterClient />
    </ToolLayout>
  );
}
