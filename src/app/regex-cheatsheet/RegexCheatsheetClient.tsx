'use client';

import { useState, useCallback } from 'react';

interface Item {
  pattern: string;
  desc: string;
  example?: string;
}

interface Section {
  title: string;
  items: Item[];
}

const SECTIONS: Section[] = [
  {
    title: '기본 메타문자',
    items: [
      { pattern: '.', desc: '임의의 한 문자 (줄바꿈 제외)', example: 'a.c → abc, a1c, a c' },
      { pattern: '^', desc: '문자열/줄의 시작', example: '^Hello → Hello로 시작하는 줄' },
      { pattern: '$', desc: '문자열/줄의 끝', example: 'end$ → end로 끝나는 줄' },
      { pattern: '\\', desc: '특수 문자 이스케이프', example: '\\. → 리터럴 점(.)' },
      { pattern: '|', desc: 'OR 연산', example: 'cat|dog → cat 또는 dog' },
      { pattern: '()', desc: '그룹 캡처', example: '(ab)+ → ab, abab' },
      { pattern: '(?:)', desc: '비캡처 그룹', example: '(?:ab)+ → 그룹화만, 캡처 안함' },
    ],
  },
  {
    title: '수량자 (Quantifiers)',
    items: [
      { pattern: '*', desc: '0회 이상 반복 (탐욕적)', example: 'ab*c → ac, abc, abbc' },
      { pattern: '+', desc: '1회 이상 반복 (탐욕적)', example: 'ab+c → abc, abbc (ac는 ×)' },
      { pattern: '?', desc: '0회 또는 1회', example: 'colou?r → color, colour' },
      { pattern: '{n}', desc: '정확히 n회 반복', example: 'a{3} → aaa' },
      { pattern: '{n,}', desc: 'n회 이상 반복', example: 'a{2,} → aa, aaa, aaaa...' },
      { pattern: '{n,m}', desc: 'n회 이상 m회 이하', example: 'a{2,4} → aa, aaa, aaaa' },
      { pattern: '*?', desc: '0회 이상 (게으른/최소 매칭)', example: '<.*?> → 각 태그 개별 매칭' },
      { pattern: '+?', desc: '1회 이상 (게으른/최소 매칭)', example: '.+? → 가능한 적게 매칭' },
      { pattern: '??', desc: '0 또는 1회 (게으른)', example: 'a?? → 빈 문자열 우선 매칭' },
    ],
  },
  {
    title: '문자 클래스',
    items: [
      { pattern: '[abc]', desc: 'a, b, c 중 하나', example: '[aeiou] → 모음 한 글자' },
      { pattern: '[^abc]', desc: 'a, b, c를 제외한 문자', example: '[^0-9] → 숫자가 아닌 문자' },
      { pattern: '[a-z]', desc: '소문자 범위', example: '[a-zA-Z] → 영문자' },
      { pattern: '[0-9]', desc: '숫자 범위', example: '[0-9]+ → 하나 이상의 숫자' },
      { pattern: '\\d', desc: '숫자 [0-9]', example: '\\d{3} → 세 자리 숫자' },
      { pattern: '\\D', desc: '숫자가 아닌 문자 [^0-9]', example: '\\D+ → 숫자가 아닌 연속 문자' },
      { pattern: '\\w', desc: '단어 문자 [a-zA-Z0-9_]', example: '\\w+ → 변수명 등 단어' },
      { pattern: '\\W', desc: '단어 문자가 아닌 것 [^a-zA-Z0-9_]', example: '\\W → 특수문자, 공백' },
      { pattern: '\\s', desc: '공백 문자 (스페이스, 탭, 줄바꿈)', example: '\\s+ → 연속 공백' },
      { pattern: '\\S', desc: '공백이 아닌 문자', example: '\\S+ → 공백 아닌 연속 문자' },
      { pattern: '\\b', desc: '단어 경계 (위치)', example: '\\bword\\b → 독립된 단어만' },
      { pattern: '\\B', desc: '단어 경계가 아닌 곳 (위치)', example: '\\Bword → 단어 내부의 word' },
    ],
  },
  {
    title: '전후방 탐색 (Lookaround)',
    items: [
      { pattern: '(?=...)', desc: '전방 탐색 (Positive Lookahead)', example: '\\d(?=px) → px 앞의 숫자' },
      { pattern: '(?!...)', desc: '부정 전방 탐색 (Negative Lookahead)', example: '\\d(?!px) → px 앞이 아닌 숫자' },
      { pattern: '(?<=...)', desc: '후방 탐색 (Positive Lookbehind)', example: '(?<=\\$)\\d+ → $ 뒤의 숫자' },
      { pattern: '(?<!...)', desc: '부정 후방 탐색 (Negative Lookbehind)', example: '(?<!\\$)\\d+ → $ 뒤가 아닌 숫자' },
    ],
  },
  {
    title: '그룹 & 역참조',
    items: [
      { pattern: '(abc)', desc: '캡처 그룹', example: '(\\d+)-(\\d+) → $1, $2로 참조' },
      { pattern: '(?:abc)', desc: '비캡처 그룹 (성능 향상)', example: '(?:https?://) → 캡처 안함' },
      { pattern: '(?<name>abc)', desc: '이름 있는 캡처 그룹', example: '(?<year>\\d{4}) → $<year>' },
      { pattern: '\\1', desc: '역참조 (첫 번째 그룹)', example: '(\\w+)\\s\\1 → hello hello' },
      { pattern: '$1 또는 \\1', desc: '치환 시 그룹 참조', example: 's/(\\w+)/[$1]/g' },
    ],
  },
  {
    title: '플래그 (Flags)',
    items: [
      { pattern: 'g', desc: '전역 검색 (모든 매치 찾기)', example: '/pattern/g' },
      { pattern: 'i', desc: '대소문자 무시', example: '/hello/i → Hello, HELLO 매칭' },
      { pattern: 'm', desc: '여러 줄 모드 (^, $ 각 줄 적용)', example: '/^start/m → 각 줄의 start' },
      { pattern: 's', desc: 'dotAll (.이 줄바꿈도 매칭)', example: '/a.b/s → a\\nb도 매칭' },
      { pattern: 'u', desc: '유니코드 지원', example: '/\\p{Hangul}/u → 한글 매칭' },
      { pattern: 'y', desc: 'sticky (lastIndex부터만 검색)', example: '/\\d+/y' },
    ],
  },
  {
    title: '자주 쓰는 패턴',
    items: [
      { pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', desc: '이메일 주소 검증' },
      { pattern: '^https?:\\/\\/(www\\.)?[\\w.-]+\\.[a-zA-Z]{2,}', desc: 'URL (http/https)' },
      { pattern: '^01[016789]-?\\d{3,4}-?\\d{4}$', desc: '한국 휴대전화번호' },
      { pattern: '^\\d{2,3}-?\\d{3,4}-?\\d{4}$', desc: '한국 전화번호 (일반)' },
      { pattern: '^\\d{3}-?\\d{2}-?\\d{5}$', desc: '사업자등록번호' },
      { pattern: '^\\d{6}-?[1-4]\\d{6}$', desc: '주민등록번호' },
      { pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$', desc: '날짜 (YYYY-MM-DD)' },
      { pattern: '^(0[1-9]|1[0-2]):(0[0-9]|[1-5]\\d)$', desc: '시간 (HH:mm, 24시)' },
      { pattern: '^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$', desc: 'HEX 색상코드 (#fff, #ffffff)' },
      { pattern: '^-?\\d+(\\.\\d+)?$', desc: '정수 또는 소수 (음수 포함)' },
      { pattern: '^\\d{1,3}(\\.\\d{1,3}){3}$', desc: 'IPv4 주소 (기본)' },
      { pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$', desc: '비밀번호 (영문+숫자, 8자 이상)' },
      { pattern: '<[^>]+>', desc: 'HTML 태그 매칭' },
      { pattern: '<(\\w+)[^>]*>.*?<\\/\\1>', desc: 'HTML 여닫는 태그 쌍' },
      { pattern: '^\\s+|\\s+$', desc: '앞뒤 공백 (trim 용도)' },
      { pattern: '\\b\\w+\\b', desc: '단어 추출 (단어 경계 사용)' },
      { pattern: '(\\d{1,3})(,\\d{3})*', desc: '천 단위 콤마 숫자 (1,000,000)' },
    ],
  },
];

const CATEGORY_NAMES = SECTIONS.map((s) => s.title);

export default function RegexCheatsheetClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedPattern, setCopiedPattern] = useState<string | null>(null);

  const handleCopy = useCallback(async (pattern: string) => {
    await navigator.clipboard.writeText(pattern);
    setCopiedPattern(pattern);
    setTimeout(() => setCopiedPattern(null), 1500);
  }, []);

  const filtered = SECTIONS
    .filter((section) => !activeCategory || section.title === activeCategory)
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.pattern.toLowerCase().includes(search.toLowerCase()) ||
          item.desc.toLowerCase().includes(search.toLowerCase()) ||
          (item.example && item.example.toLowerCase().includes(search.toLowerCase()))
      ),
    }))
    .filter((section) => section.items.length > 0);

  const totalCount = filtered.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="패턴 검색... (예: 이메일, 숫자, lookahead, 전화번호)"
          className="input-area px-4 py-3 pr-10"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] text-lg"
            title="검색 초기화"
          >
            ×
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !activeCategory
              ? 'bg-brand-500 text-white'
              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
          }`}
        >
          전체
        </button>
        {CATEGORY_NAMES.map((name) => (
          <button
            key={name}
            onClick={() => setActiveCategory(activeCategory === name ? null : name)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === name
                ? 'bg-brand-500 text-white'
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <p className="text-xs text-[var(--color-text-secondary)]">
        {totalCount}개 패턴 {search && `(검색: "${search}")`}
      </p>

      <div className="space-y-6">
        {filtered.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
            <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--color-surface)]">
                    <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)] w-[30%]">패턴</th>
                    <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)] w-[30%]">설명</th>
                    <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)]">예시</th>
                  </tr>
                </thead>
                <tbody>
                  {section.items.map((item) => (
                    <tr key={item.pattern + item.desc} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors group">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <code className="font-mono text-xs text-brand-500 bg-brand-500/10 px-2 py-1 rounded break-all">{item.pattern}</code>
                          <button
                            onClick={() => handleCopy(item.pattern)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[var(--color-text-secondary)] hover:text-brand-500 shrink-0"
                            title="복사"
                          >
                            {copiedPattern === item.pattern ? '✓' : '복사'}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-[var(--color-text-secondary)]">{item.desc}</td>
                      <td className="px-4 py-2.5 text-[var(--color-text-secondary)] text-xs">
                        {item.example && <code className="font-mono">{item.example}</code>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 space-y-3">
          <p className="text-[var(--color-text-secondary)]">
            검색 결과가 없습니다.
          </p>
          <button
            onClick={() => { setSearch(''); setActiveCategory(null); }}
            className="text-brand-500 hover:text-brand-600 text-sm font-medium"
          >
            전체 보기
          </button>
        </div>
      )}
    </div>
  );
}
