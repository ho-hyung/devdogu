'use client';

import { useState, useEffect } from 'react';

interface TimestampClientProps {
  dict?: Record<string, string>;
}

export default function TimestampClient({ dict }: TimestampClientProps) {
  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [tsInput, setTsInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [tsResult, setTsResult] = useState('');
  const [dateResult, setDateResult] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  const tsToDate = () => {
    if (!tsInput.trim()) return;
    const num = Number(tsInput.trim());
    if (isNaN(num)) { setDateResult(t('invalidNumber', '유효하지 않은 숫자입니다.')); return; }
    // 자동 감지: 13자리면 밀리초, 10자리면 초
    const ms = tsInput.length >= 13 ? num : num * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) { setDateResult(t('invalidTimestamp', '유효하지 않은 타임스탬프입니다.')); return; }
    setDateResult(
      `${d.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} (KST)\n` +
      `${d.toISOString()} (UTC)\n` +
      `${d.toLocaleString('en-US', { timeZone: 'UTC' })} (UTC)`
    );
  };

  const dateToTs = () => {
    if (!dateInput.trim()) return;
    const d = new Date(dateInput.trim());
    if (isNaN(d.getTime())) { setTsResult(t('invalidDate', '유효하지 않은 날짜 형식입니다.')); return; }
    setTsResult(
      `초(seconds): ${Math.floor(d.getTime() / 1000)}\n` +
      `밀리초(ms): ${d.getTime()}`
    );
  };

  const handleCopyNow = async () => {
    await navigator.clipboard.writeText(String(now));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Current Time */}
      <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-center">
        <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">{t('currentTimestamp', '현재 Unix 타임스탬프')}</p>
        <button
          onClick={handleCopyNow}
          className="font-mono text-4xl font-bold text-brand-500 hover:text-brand-400 transition-colors cursor-pointer"
          title={t('clickToCopy', '클릭하여 복사')}
        >
          {now}
        </button>
        <p className="text-xs text-[var(--color-text-secondary)] mt-2">
          {copied ? t('copied', '✓ 복사됨!') : t('clickToCopyHint', '클릭하면 복사됩니다')}
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">
          {new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timestamp → Date */}
        <div className="p-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl space-y-3">
          <h3 className="font-semibold text-sm">{t('tsToDate', '타임스탬프 → 날짜')}</h3>
          <input
            type="text"
            value={tsInput}
            onChange={(e) => setTsInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && tsToDate()}
            placeholder="예: 1709512000"
            className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
          <button onClick={tsToDate} className="btn-primary w-full">{t('convert', '변환')}</button>
          {dateResult && (
            <pre className="p-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg font-mono text-xs whitespace-pre-wrap">
              {dateResult}
            </pre>
          )}
        </div>

        {/* Date → Timestamp */}
        <div className="p-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl space-y-3">
          <h3 className="font-semibold text-sm">{t('dateToTs', '날짜 → 타임스탬프')}</h3>
          <input
            type="text"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && dateToTs()}
            placeholder="예: 2024-03-04 12:00:00"
            className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
          <button onClick={dateToTs} className="btn-primary w-full">{t('convert', '변환')}</button>
          {tsResult && (
            <pre className="p-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg font-mono text-xs whitespace-pre-wrap">
              {tsResult}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
