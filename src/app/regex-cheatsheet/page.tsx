import { createMetadata } from '@/lib/metadata';
import RegexCheatsheetClient from './RegexCheatsheetClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: '정규식 문법 정리 치트시트',
  description:
    '정규표현식 치트시트 — 메타문자, 수량자, 문자 클래스, Lookaround, 플래그, 자주 쓰는 패턴(이메일, 전화번호, URL 등)을 정리한 정규식 가이드. 복사 버튼으로 바로 사용하세요.',
  path: '/regex-cheatsheet',
  keywords: [
    '정규식 문법', 'regex cheatsheet', '정규표현식', '이메일 정규식', '숫자만 정규식',
    'regex 패턴', '정규식 치트시트', 'regular expression', '전화번호 정규식',
    '비밀번호 정규식', 'URL 정규식', 'regex lookahead', '정규식 예제',
  ],
});

const faq = [
  { q: '정규표현식이란 무엇인가요?', a: '정규표현식(Regular Expression, Regex)은 문자열에서 특정 패턴을 검색, 매칭, 치환하기 위한 문법입니다. JavaScript, Python, Java, Go, PHP 등 대부분의 프로그래밍 언어와 텍스트 에디터에서 지원됩니다.' },
  { q: '탐욕적(Greedy)과 게으른(Lazy) 매칭의 차이는 무엇인가요?', a: '탐욕적 매칭(*, +)은 가능한 한 많이 매칭합니다. 게으른 매칭(*?, +?)은 가능한 한 적게 매칭합니다. 예를 들어 "<b>a</b><b>b</b>"에서 <.*>는 전체를 하나로 매칭하지만, <.*?>는 <b>, </b> 등 각 태그를 개별로 매칭합니다.' },
  { q: '정규식에서 이메일을 어떻게 검증하나요?', a: '간단한 이메일 패턴은 ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$입니다. 다만 RFC 5322 표준에 완벽히 부합하는 이메일 검증은 정규식만으로는 매우 복잡하므로, 실제 서비스에서는 전용 라이브러리 사용을 권장합니다.' },
  { q: 'Lookahead와 Lookbehind는 무엇인가요?', a: 'Lookahead (?=...)는 뒤에 특정 패턴이 오는 위치를 매칭하고, Lookbehind (?<=...)는 앞에 특정 패턴이 있는 위치를 매칭합니다. 실제 문자를 소비하지 않는 "제로폭 어설션"이므로 조건부 매칭에 유용합니다.' },
  { q: '캡처 그룹과 비캡처 그룹의 차이는 무엇인가요?', a: '캡처 그룹 ()은 매칭된 부분을 기억하여 $1, $2 등으로 역참조할 수 있습니다. 비캡처 그룹 (?:)은 그룹화만 하고 캡처하지 않아 역참조가 불가하지만, 성능이 약간 더 좋고 그룹 번호를 소비하지 않습니다.' },
  { q: '정규식 플래그 g, i, m, s의 의미는 무엇인가요?', a: 'g(global)는 모든 매치를 찾고, i(case-insensitive)는 대소문자를 무시합니다. m(multiline)은 ^와 $를 각 줄에 적용하고, s(dotAll)는 .이 줄바꿈 문자도 매칭하게 합니다.' },
  { q: '한국어(한글) 정규식은 어떻게 작성하나요?', a: 'JavaScript에서 유니코드 플래그(u)와 함께 /\\p{Script=Hangul}/u를 사용하거나, 유니코드 범위 [가-힣]으로 완성형 한글을, [ㄱ-ㅎㅏ-ㅣ가-힣]으로 자모 포함 한글을 매칭할 수 있습니다.' },
];

export default function RegexCheatsheetPage() {
  return (
    <ToolLayout toolId="regex-cheatsheet" faq={faq}>
      <RegexCheatsheetClient />
    </ToolLayout>
  );
}
