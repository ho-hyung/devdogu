'use client';

import { useState, useCallback } from 'react';

interface Example {
  expression: string;
  desc: string;
}

const FIELD_DESCRIPTIONS = [
  { field: '분 (Minute)', range: '0-59', example: '30 → 30분' },
  { field: '시 (Hour)', range: '0-23', example: '14 → 오후 2시' },
  { field: '일 (Day of Month)', range: '1-31', example: '15 → 매월 15일' },
  { field: '월 (Month)', range: '1-12 또는 JAN-DEC', example: '6 → 6월' },
  { field: '요일 (Day of Week)', range: '0-6 또는 SUN-SAT', example: '1 → 월요일' },
];

const SPECIAL_CHARS = [
  { char: '*', desc: '모든 값', example: '분 필드에 * → 매분 실행' },
  { char: ',', desc: '여러 값 나열', example: '1,3,5 → 월, 수, 금요일에 실행' },
  { char: '-', desc: '범위 지정', example: '1-5 → 월~금 (평일)' },
  { char: '/', desc: '간격 지정', example: '*/10 → 매 10단위마다 실행' },
  { char: 'L', desc: '마지막 (일/요일 필드)', example: '일 필드에 L → 매월 마지막 날' },
  { char: 'W', desc: '가장 가까운 평일 (일 필드)', example: '15W → 15일에 가장 가까운 평일' },
  { char: '#', desc: 'n번째 요일 (요일 필드)', example: '5#3 → 세 번째 금요일' },
  { char: '?', desc: '지정하지 않음 (일/요일)', example: '일 필드 ? → 요일 필드에 위임' },
];

const SECTIONS: { title: string; examples: Example[] }[] = [
  {
    title: '기본 주기',
    examples: [
      { expression: '* * * * *', desc: '매분 실행' },
      { expression: '*/5 * * * *', desc: '매 5분마다 실행' },
      { expression: '*/10 * * * *', desc: '매 10분마다 실행' },
      { expression: '*/15 * * * *', desc: '매 15분마다 실행' },
      { expression: '*/30 * * * *', desc: '매 30분마다 실행' },
      { expression: '0 * * * *', desc: '매시 정각 실행' },
      { expression: '0 */2 * * *', desc: '2시간마다 정각 실행' },
      { expression: '0 */6 * * *', desc: '6시간마다 정각 실행' },
    ],
  },
  {
    title: '매일 실행',
    examples: [
      { expression: '0 0 * * *', desc: '매일 자정 (00:00) 실행' },
      { expression: '0 6 * * *', desc: '매일 오전 6시 실행' },
      { expression: '0 9 * * *', desc: '매일 오전 9시 실행' },
      { expression: '0 12 * * *', desc: '매일 정오 (12:00) 실행' },
      { expression: '0 18 * * *', desc: '매일 오후 6시 실행' },
      { expression: '0 9,18 * * *', desc: '매일 오전 9시, 오후 6시 실행' },
      { expression: '0 9-18 * * *', desc: '매일 오전 9시~오후 6시 매시 정각' },
      { expression: '30 2 * * *', desc: '매일 새벽 2시 30분 실행' },
    ],
  },
  {
    title: '요일 지정',
    examples: [
      { expression: '30 9 * * 1-5', desc: '평일(월~금) 오전 9시 30분' },
      { expression: '0 0 * * 0', desc: '매주 일요일 자정' },
      { expression: '0 0 * * 1', desc: '매주 월요일 자정' },
      { expression: '0 0 * * 5', desc: '매주 금요일 자정' },
      { expression: '0 0 * * 6,0', desc: '주말(토, 일) 자정' },
      { expression: '*/30 9-17 * * 1-5', desc: '평일 근무시간(9-17시) 30분마다' },
      { expression: '0 2 * * 6', desc: '매주 토요일 새벽 2시 (백업 등)' },
    ],
  },
  {
    title: '월/일 지정',
    examples: [
      { expression: '0 0 1 * *', desc: '매월 1일 자정' },
      { expression: '0 0 15 * *', desc: '매월 15일 자정' },
      { expression: '0 0 1,15 * *', desc: '매월 1일, 15일 자정' },
      { expression: '0 0 1 1 *', desc: '매년 1월 1일 자정' },
      { expression: '0 0 1 */3 *', desc: '3개월마다 1일 자정 (분기)' },
      { expression: '0 0 1 1,4,7,10 *', desc: '분기 시작일(1,4,7,10월) 자정' },
      { expression: '0 9 25 12 *', desc: '매년 12월 25일 오전 9시' },
    ],
  },
];

const PRESETS = [
  { name: '@yearly / @annually', expression: '0 0 1 1 *', desc: '매년 1월 1일 자정' },
  { name: '@monthly', expression: '0 0 1 * *', desc: '매월 1일 자정' },
  { name: '@weekly', expression: '0 0 * * 0', desc: '매주 일요일 자정' },
  { name: '@daily / @midnight', expression: '0 0 * * *', desc: '매일 자정' },
  { name: '@hourly', expression: '0 * * * *', desc: '매시 정각' },
  { name: '@reboot', expression: '-', desc: '시스템 재부팅 시 한 번 실행' },
];

const ALL_SECTION_TITLES = ['기본 주기', '매일 실행', '요일 지정', '월/일 지정'];

export default function CronCheatsheetClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedExpr, setCopiedExpr] = useState<string | null>(null);

  const handleCopy = useCallback(async (expr: string) => {
    await navigator.clipboard.writeText(expr);
    setCopiedExpr(expr);
    setTimeout(() => setCopiedExpr(null), 1500);
  }, []);

  const query = search.toLowerCase();
  const isSearching = query.length > 0;

  const filteredSections = SECTIONS
    .filter((section) => !activeCategory || section.title === activeCategory)
    .map((section) => ({
      ...section,
      examples: section.examples.filter(
        (e) =>
          e.expression.includes(search) ||
          e.desc.toLowerCase().includes(query)
      ),
    }))
    .filter((section) => section.examples.length > 0);

  const filteredFields = FIELD_DESCRIPTIONS.filter(
    (f) =>
      f.field.toLowerCase().includes(query) ||
      f.range.toLowerCase().includes(query) ||
      f.example.toLowerCase().includes(query)
  );

  const filteredChars = SPECIAL_CHARS.filter(
    (s) =>
      s.char.toLowerCase().includes(query) ||
      s.desc.toLowerCase().includes(query) ||
      s.example.toLowerCase().includes(query)
  );

  const filteredPresets = PRESETS.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.expression.includes(search) ||
      p.desc.toLowerCase().includes(query)
  );

  const totalCount = filteredSections.reduce((sum, s) => sum + s.examples.length, 0)
    + filteredFields.length + filteredChars.length + filteredPresets.length;

  return (
    <div className="space-y-8">
      {/* 검색 */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색... (예: 매일, 5분, 월요일, 자정, 범위, @daily)"
          className="input-area px-4 py-3 w-full"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* 카테고리 필터 (예제 섹션용) */}
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
        {ALL_SECTION_TITLES.map((name) => (
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

      {/* 결과 카운트 */}
      {isSearching && (
        <p className="text-xs text-[var(--color-text-secondary)]">
          {totalCount}개 결과 (검색: &quot;{search}&quot;)
        </p>
      )}

      {/* Cron 형식 - 검색 중에는 숨김 */}
      {!isSearching && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Cron 표현식 형식</h2>
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4">
            <code className="font-mono text-sm text-brand-500">
              ┌───────────── 분 (0-59)<br />
              │ ┌───────────── 시 (0-23)<br />
              │ │ ┌───────────── 일 (1-31)<br />
              │ │ │ ┌───────────── 월 (1-12)<br />
              │ │ │ │ ┌───────────── 요일 (0-6, 일=0)<br />
              * &nbsp;* &nbsp;* &nbsp;* &nbsp;*
            </code>
          </div>
        </div>
      )}

      {/* 필드 설명 */}
      {(!isSearching || filteredFields.length > 0) && (
        <div>
          <h2 className="text-lg font-semibold mb-3">필드별 범위</h2>
          <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--color-surface)]">
                  <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)]">필드</th>
                  <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)]">범위</th>
                  <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)]">예시</th>
                </tr>
              </thead>
              <tbody>
                {(isSearching ? filteredFields : FIELD_DESCRIPTIONS).map((f) => (
                  <tr key={f.field} className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-2.5 font-medium">{f.field}</td>
                    <td className="px-4 py-2.5"><code className="font-mono text-xs text-brand-500 bg-brand-500/10 px-2 py-1 rounded">{f.range}</code></td>
                    <td className="px-4 py-2.5 text-[var(--color-text-secondary)]">{f.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 특수 문자 */}
      {(!isSearching || filteredChars.length > 0) && (
        <div>
          <h2 className="text-lg font-semibold mb-3">특수 문자</h2>
          <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--color-surface)]">
                  <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)] w-20">문자</th>
                  <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)] w-48">의미</th>
                  <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)]">예시</th>
                </tr>
              </thead>
              <tbody>
                {(isSearching ? filteredChars : SPECIAL_CHARS).map((s) => (
                  <tr key={s.char} className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-2.5"><code className="font-mono text-sm font-bold text-brand-500">{s.char}</code></td>
                    <td className="px-4 py-2.5 font-medium">{s.desc}</td>
                    <td className="px-4 py-2.5 text-[var(--color-text-secondary)]">{s.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 예제 섹션들 */}
      {filteredSections.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">자주 쓰는 예제</h2>
          <div className="space-y-6">
            {filteredSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-2">{section.title}</h3>
                <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[var(--color-surface)]">
                        <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)] w-56">표현식</th>
                        <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)]">설명</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.examples.map((e) => (
                        <tr key={e.expression + e.desc} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors group">
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-2">
                              <code className="font-mono text-xs text-brand-500 bg-brand-500/10 px-2 py-1 rounded">{e.expression}</code>
                              <button
                                onClick={() => handleCopy(e.expression)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[var(--color-text-secondary)] hover:text-brand-500 shrink-0"
                                title="복사"
                              >
                                {copiedExpr === e.expression ? '✓' : '복사'}
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-2.5 text-[var(--color-text-secondary)]">{e.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 프리셋 */}
      {(!isSearching || filteredPresets.length > 0) && (
        <div>
          <h2 className="text-lg font-semibold mb-3">프리셋 (축약형)</h2>
          <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--color-surface)]">
                  <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)]">프리셋</th>
                  <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)]">동일 표현식</th>
                  <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)]">설명</th>
                </tr>
              </thead>
              <tbody>
                {(isSearching ? filteredPresets : PRESETS).map((p) => (
                  <tr key={p.name} className="border-t border-[var(--color-border)] group">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <code className="font-mono text-xs text-brand-500 bg-brand-500/10 px-2 py-1 rounded">{p.name}</code>
                        <button
                          onClick={() => handleCopy(p.name.split(' / ')[0])}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[var(--color-text-secondary)] hover:text-brand-500 shrink-0"
                          title="복사"
                        >
                          {copiedExpr === p.name.split(' / ')[0] ? '✓' : '복사'}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2.5"><code className="font-mono text-xs">{p.expression}</code></td>
                    <td className="px-4 py-2.5 text-[var(--color-text-secondary)]">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isSearching && totalCount === 0 && (
        <div className="text-center py-8">
          <p className="text-[var(--color-text-secondary)] mb-2">
            &quot;{search}&quot;에 대한 검색 결과가 없습니다.
          </p>
          <button
            onClick={() => setSearch('')}
            className="text-brand-500 text-sm hover:underline"
          >
            전체 보기
          </button>
        </div>
      )}
    </div>
  );
}
