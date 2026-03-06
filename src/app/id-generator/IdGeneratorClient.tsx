'use client';

import { useState, useCallback } from 'react';

type IdType = 'uuid' | 'ulid' | 'nanoid';

const ID_LABELS: Record<IdType, string> = {
  uuid: 'UUID v4',
  ulid: 'ULID',
  nanoid: 'NanoID',
};

function generateUUIDv4(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join('-');
}

const CROCKFORD_BASE32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function generateULID(): string {
  const now = Date.now();
  let timeStr = '';
  let t = now;
  for (let i = 0; i < 10; i++) {
    timeStr = CROCKFORD_BASE32[t % 32] + timeStr;
    t = Math.floor(t / 32);
  }

  const bytes = crypto.getRandomValues(new Uint8Array(10));
  let randStr = '';
  for (let i = 0; i < 16; i++) {
    const byteIndex = Math.floor(i * 10 / 16);
    const bitOffset = (i * 5) % 8;
    const val = ((bytes[byteIndex] >> bitOffset) | ((bytes[Math.min(byteIndex + 1, 9)] << (8 - bitOffset)))) & 0x1f;
    randStr += CROCKFORD_BASE32[val];
  }

  return timeStr + randStr;
}

const NANOID_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';

function generateNanoID(size: number = 21): string {
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(bytes, (b) => NANOID_ALPHABET[b & 63]).join('');
}

function generateIds(type: IdType, count: number, nanoidLength: number): string[] {
  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    switch (type) {
      case 'uuid':
        results.push(generateUUIDv4());
        break;
      case 'ulid':
        results.push(generateULID());
        break;
      case 'nanoid':
        results.push(generateNanoID(nanoidLength));
        break;
    }
  }
  return results;
}

interface IdGeneratorClientProps {
  dict?: Record<string, string>;
}

export default function IdGeneratorClient({ dict }: IdGeneratorClientProps) {
  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;
  const [idType, setIdType] = useState<IdType>('uuid');
  const [count, setCount] = useState(1);
  const [nanoidLength, setNanoidLength] = useState(21);
  const [results, setResults] = useState<string[]>(() => [generateUUIDv4()]);
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    setResults(generateIds(idType, count, nanoidLength));
    setCopied(false);
  }, [idType, count, nanoidLength]);

  const handleCopy = async () => {
    const text = results.join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySingle = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCountChange = (value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    setCount(Math.max(1, Math.min(100, num)));
  };

  const handleNanoidLengthChange = (value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    setNanoidLength(Math.max(1, Math.min(128, num)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-1">
          {(['uuid', 'ulid', 'nanoid'] as IdType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setIdType(type);
                setResults(generateIds(type, count, nanoidLength));
                setCopied(false);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                idType === type
                  ? 'bg-brand-500/10 text-brand-500'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
              }`}
            >
              {ID_LABELS[type]}
            </button>
          ))}
        </div>
        <button onClick={handleGenerate} className="btn-primary">{t('generate', '생성하기')}</button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-[var(--color-text-secondary)]">{t('count', '개수')}</label>
          <input
            type="number" value={count} onChange={(e) => handleCountChange(e.target.value)}
            min={1} max={100}
            className="w-20 px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
          <span className="text-xs text-[var(--color-text-secondary)]">1~100</span>
        </div>
        {idType === 'nanoid' && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-[var(--color-text-secondary)]">{t('length', '길이')}</label>
            <input
              type="number" value={nanoidLength} onChange={(e) => handleNanoidLengthChange(e.target.value)}
              min={1} max={128}
              className="w-20 px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
            <span className="text-xs text-[var(--color-text-secondary)]">1~128</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
            {t('generatedResult', '생성 결과')} ({results.length}{t('countUnit', '개')})
          </label>
          <button onClick={handleCopy} className="text-xs text-brand-500 hover:text-brand-400 transition-colors">
            {copied ? t('copied', '✓ 복사됨') : t('copyAll', '전체 복사')}
          </button>
        </div>
        {results.length === 1 ? (
          <div
            onClick={() => handleCopySingle(results[0])}
            className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg font-mono text-lg text-brand-500 cursor-pointer hover:bg-brand-500/5 transition-colors select-all text-center"
            title={t('clickToCopy', '클릭하여 복사')}
          >
            {results[0]}
          </div>
        ) : (
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg divide-y divide-[var(--color-border)] max-h-[500px] overflow-y-auto custom-scrollbar">
            {results.map((id, i) => (
              <div
                key={i}
                onClick={() => handleCopySingle(id)}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-brand-500/5 cursor-pointer transition-colors group"
                title={t('clickToCopy', '클릭하여 복사')}
              >
                <span className="text-xs text-[var(--color-text-secondary)] w-8 text-right shrink-0">{i + 1}</span>
                <span className="font-mono text-sm select-all">{id}</span>
                <span className="text-xs text-[var(--color-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0">{t('copy', '복사')}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'UUID v4', desc: '128비트, 36자 (하이픈 포함), RFC 4122' },
          { label: 'ULID', desc: '128비트, 26자, 시간순 정렬 가능' },
          { label: 'NanoID', desc: `${nanoidLength}자, URL-safe, 커스텀 길이` },
        ].map((info) => (
          <div key={info.label} className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <p className="text-xs font-semibold mb-1">{info.label}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{info.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
