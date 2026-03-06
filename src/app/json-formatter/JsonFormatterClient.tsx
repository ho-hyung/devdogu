'use client';

import { useState, useCallback } from 'react';

type IndentSize = 2 | 4;

export default function JsonFormatterClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState<IndentSize>(2);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{ keys: number; depth: number; size: string } | null>(null);

  const getDepth = (obj: unknown, current = 0): number => {
    if (obj === null || typeof obj !== 'object') return current;
    const children = Object.values(obj as Record<string, unknown>);
    if (children.length === 0) return current;
    return Math.max(...children.map((v) => getDepth(v, current + 1)));
  };

  const countKeys = (obj: unknown): number => {
    if (obj === null || typeof obj !== 'object') return 0;
    const entries = Object.entries(obj as Record<string, unknown>);
    return entries.length + entries.reduce((sum, [, v]) => sum + countKeys(v), 0);
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      setStats(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError('');
      setStats({
        keys: countKeys(parsed),
        depth: getDepth(parsed),
        size: formatSize(new Blob([formatted]).size),
      });
    } catch (e) {
      const msg = e instanceof SyntaxError ? e.message : '알 수 없는 오류';
      setError(msg);
      setOutput('');
      setStats(null);
    }
  }, [input, indent]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      setStats({
        keys: countKeys(parsed),
        depth: getDepth(parsed),
        size: formatSize(new Blob([minified]).size),
      });
    } catch (e) {
      const msg = e instanceof SyntaxError ? e.message : '알 수 없는 오류';
      setError(msg);
      setOutput('');
      setStats(null);
    }
  }, [input]);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setStats(null);
  };

  const handleSample = () => {
    const sample = JSON.stringify({
      name: 'DevDogu',
      version: '1.0.0',
      description: '개발자를 위한 온라인 도구 모음',
      tools: [
        { id: 1, name: 'JSON 포매터', active: true },
        { id: 2, name: 'Base64 인코더', active: true },
        { id: 3, name: '정규식 테스터', active: false },
      ],
      config: { theme: 'dark', language: 'ko', nested: { deep: { value: 42 } } },
    });
    setInput(sample);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={handleFormat} className="btn-primary">
          포맷하기
        </button>
        <button onClick={handleMinify} className="btn-secondary">
          압축하기
        </button>
        <button onClick={handleClear} className="btn-secondary">
          초기화
        </button>
        <button onClick={handleSample} className="btn-secondary text-[var(--color-text-secondary)]">
          샘플 데이터
        </button>

        <div className="ml-auto flex items-center gap-2 text-sm">
          <span className="text-[var(--color-text-secondary)]">들여쓰기:</span>
          {([2, 4] as IndentSize[]).map((size) => (
            <button
              key={size}
              onClick={() => setIndent(size)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                indent === size
                  ? 'bg-brand-500/10 text-brand-500'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
              }`}
            >
              {size}칸
            </button>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
            입력
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                handleFormat();
              }
            }}
            placeholder='JSON 데이터를 붙여넣으세요... (Ctrl+Enter로 포맷)'
            className="input-area min-h-[400px]"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
              결과
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="text-xs text-brand-500 hover:text-brand-400 transition-colors"
              >
                {copied ? '✓ 복사됨' : '복사하기'}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="포맷된 결과가 여기에 표시됩니다."
            className="input-area min-h-[400px] bg-[var(--color-surface)]"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <span className="text-red-500 text-sm shrink-0">✕</span>
          <div>
            <p className="text-sm font-medium text-red-500">유효하지 않은 JSON</p>
            <p className="text-xs text-red-400/80 mt-1 font-mono">{error}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="flex items-center gap-6 text-xs text-[var(--color-text-secondary)]">
          <span>키 수: <strong className="text-[var(--color-text)]">{stats.keys}</strong></span>
          <span>깊이: <strong className="text-[var(--color-text)]">{stats.depth}</strong></span>
          <span>크기: <strong className="text-[var(--color-text)]">{stats.size}</strong></span>
        </div>
      )}
    </div>
  );
}
