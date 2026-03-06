'use client';

import { useState, useMemo } from 'react';

const PRESETS = [
  { label: '이메일', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
  { label: '전화번호 (한국)', pattern: '01[016789]-?\\d{3,4}-?\\d{4}' },
  { label: 'URL', pattern: 'https?://[\\w\\-._~:/?#@!$&\'()*+,;=%]+' },
  { label: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b' },
  { label: '숫자만', pattern: '\\d+' },
  { label: '한글만', pattern: '[가-힣]+' },
];

export default function RegexTesterClient() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testStr, setTestStr] = useState('');
  const [error, setError] = useState('');

  const matches = useMemo(() => {
    if (!pattern || !testStr) { setError(''); return []; }
    try {
      const regex = new RegExp(pattern, flags);
      setError('');
      const results: { match: string; index: number; groups?: Record<string, string> }[] = [];
      let m: RegExpExecArray | null;

      if (flags.includes('g')) {
        while ((m = regex.exec(testStr)) !== null) {
          results.push({ match: m[0], index: m.index, groups: m.groups });
          if (m[0].length === 0) regex.lastIndex++;
        }
      } else {
        m = regex.exec(testStr);
        if (m) results.push({ match: m[0], index: m.index, groups: m.groups });
      }
      return results;
    } catch (e) {
      setError(e instanceof Error ? e.message : '유효하지 않은 정규식');
      return [];
    }
  }, [pattern, flags, testStr]);

  const highlightedText = useMemo(() => {
    if (!pattern || !testStr || error) return null;
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      let lastIndex = 0;
      const parts: { text: string; highlight: boolean }[] = [];
      let m: RegExpExecArray | null;

      while ((m = regex.exec(testStr)) !== null) {
        if (m.index > lastIndex) parts.push({ text: testStr.slice(lastIndex, m.index), highlight: false });
        parts.push({ text: m[0], highlight: true });
        lastIndex = m.index + m[0].length;
        if (m[0].length === 0) { regex.lastIndex++; lastIndex++; }
      }
      if (lastIndex < testStr.length) parts.push({ text: testStr.slice(lastIndex), highlight: false });
      return parts;
    } catch { return null; }
  }, [pattern, flags, testStr, error]);

  const toggleFlag = (flag: string) => {
    setFlags((f) => (f.includes(flag) ? f.replace(flag, '') : f + flag));
  };

  return (
    <div className="space-y-4">
      {/* Pattern Input */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-500/30 focus-within:border-brand-500">
          <span className="pl-3 text-[var(--color-text-secondary)] font-mono text-sm">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="정규식 패턴"
            className="flex-1 px-1 py-3 bg-transparent font-mono text-sm focus:outline-none"
            spellCheck={false}
          />
          <span className="text-[var(--color-text-secondary)] font-mono text-sm">/</span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-12 px-1 py-3 bg-transparent font-mono text-sm text-brand-500 focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Flags & Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[var(--color-text-secondary)]">플래그:</span>
        {[
          { flag: 'g', label: 'global' },
          { flag: 'i', label: 'case-insensitive' },
          { flag: 'm', label: 'multiline' },
          { flag: 's', label: 'dotAll' },
        ].map(({ flag, label }) => (
          <button
            key={flag}
            onClick={() => toggleFlag(flag)}
            className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
              flags.includes(flag) ? 'bg-brand-500/10 text-brand-500' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
            }`}
            title={label}
          >
            {flag}
          </button>
        ))}

        <span className="text-[var(--color-border)] mx-2">|</span>
        <span className="text-xs text-[var(--color-text-secondary)]">프리셋:</span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => setPattern(p.pattern)}
            className="px-2 py-1 rounded text-xs bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-brand-400/50 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Test String */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
          테스트 문자열
        </label>
        <textarea
          value={testStr}
          onChange={(e) => setTestStr(e.target.value)}
          placeholder="정규식을 테스트할 문자열을 입력하세요..."
          className="input-area min-h-[150px]"
          spellCheck={false}
        />
      </div>

      {/* Highlighted Result */}
      {highlightedText && highlightedText.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
            매칭 결과 ({matches.length}건)
          </label>
          <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg font-mono text-sm whitespace-pre-wrap break-all leading-relaxed">
            {highlightedText.map((part, i) =>
              part.highlight ? (
                <mark key={i} className="bg-brand-500/20 text-brand-400 rounded px-0.5">
                  {part.text}
                </mark>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </div>
        </div>
      )}

      {/* Match List */}
      {matches.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
            매칭 목록
          </label>
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg divide-y divide-[var(--color-border)]">
            {matches.slice(0, 50).map((m, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-2 text-xs font-mono">
                <span className="text-[var(--color-text-secondary)] w-8">#{i + 1}</span>
                <span className="text-brand-500 flex-1 break-all">{m.match}</span>
                <span className="text-[var(--color-text-secondary)]">index: {m.index}</span>
              </div>
            ))}
            {matches.length > 50 && (
              <div className="px-4 py-2 text-xs text-[var(--color-text-secondary)]">
                ...외 {matches.length - 50}건
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-500 font-mono">✕ {error}</p>
        </div>
      )}
    </div>
  );
}
