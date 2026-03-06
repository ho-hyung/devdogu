'use client';

import { useState } from 'react';

type Mode = 'encode' | 'decode';

interface Base64ClientProps {
  dict?: Record<string, string>;
}

export default function Base64Client({ dict }: Base64ClientProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))));
      }
      setError('');
    } catch {
      setError(mode === 'encode' ? t('encodeError', '인코딩할 수 없는 문자가 포함되어 있습니다.') : t('decodeError', '유효하지 않은 Base64 문자열입니다.'));
      setOutput('');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setMode((m) => (m === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    setOutput('');
    setError('');
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex items-center gap-2">
        <div className="inline-flex bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-1">
          {(['encode', 'decode'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); setOutput(''); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === m ? 'bg-brand-500/10 text-brand-500' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
              }`}
            >
              {m === 'encode' ? t('encode', '인코딩') : t('decode', '디코딩')}
            </button>
          ))}
        </div>

        <button onClick={handleConvert} className="btn-primary">
          {t('convert', '변환하기')}
        </button>
        <button onClick={handleSwap} className="btn-secondary" title={t('swap', '⇄ 바꾸기')}>
          {t('swap', '⇄ 바꾸기')}
        </button>
      </div>

      {/* Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
            {mode === 'encode' ? t('originalText', '원본 텍스트') : t('base64String', 'Base64 문자열')}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleConvert();
            }}
            placeholder={mode === 'encode' ? t('encodePlaceholder', '인코딩할 텍스트를 입력하세요...') : t('decodePlaceholder', 'Base64 문자열을 입력하세요...')}
            className="input-area min-h-[300px]"
            spellCheck={false}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
              {mode === 'encode' ? t('base64Result', 'Base64 결과') : t('decodeResult', '디코딩 결과')}
            </label>
            {output && (
              <button onClick={handleCopy} className="text-xs text-brand-500 hover:text-brand-400 transition-colors">
                {copied ? t('copied', '✓ 복사됨') : t('copy', '복사하기')}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t('outputPlaceholder', '결과가 여기에 표시됩니다.')}
            className="input-area min-h-[300px] bg-[var(--color-surface)]"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <span className="text-red-500 text-sm">✕</span>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
