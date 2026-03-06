'use client';

import { useState } from 'react';

type Mode = 'encode' | 'decode';

export default function UrlEncoderClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('encode');
  const [encodeType, setEncodeType] = useState<'component' | 'full'>('component');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) { setOutput(''); setError(''); return; }
    try {
      if (mode === 'encode') {
        setOutput(encodeType === 'component' ? encodeURIComponent(input) : encodeURI(input));
      } else {
        setOutput(encodeType === 'component' ? decodeURIComponent(input) : decodeURI(input));
      }
      setError('');
    } catch {
      setError('유효하지 않은 입력입니다.');
      setOutput('');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-1">
          {(['encode', 'decode'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); setOutput(''); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === m ? 'bg-brand-500/10 text-brand-500' : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {m === 'encode' ? '인코딩' : '디코딩'}
            </button>
          ))}
        </div>
        <div className="inline-flex bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-1">
          <button
            onClick={() => setEncodeType('component')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              encodeType === 'component' ? 'bg-brand-500/10 text-brand-500' : 'text-[var(--color-text-secondary)]'
            }`}
          >
            Component
          </button>
          <button
            onClick={() => setEncodeType('full')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              encodeType === 'full' ? 'bg-brand-500/10 text-brand-500' : 'text-[var(--color-text-secondary)]'
            }`}
          >
            Full URI
          </button>
        </div>
        <button onClick={handleConvert} className="btn-primary">변환하기</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">입력</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleConvert(); }}
            placeholder={mode === 'encode' ? 'URL 인코딩할 문자열을 입력하세요...' : '디코딩할 URL 문자열을 입력하세요...'}
            className="input-area min-h-[300px]"
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">결과</label>
            {output && (
              <button onClick={handleCopy} className="text-xs text-brand-500 hover:text-brand-400 transition-colors">
                {copied ? '✓ 복사됨' : '복사하기'}
              </button>
            )}
          </div>
          <textarea value={output} readOnly placeholder="결과가 여기에 표시됩니다." className="input-area min-h-[300px] bg-[var(--color-surface)]" />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-500">✕ {error}</p>
        </div>
      )}
    </div>
  );
}
