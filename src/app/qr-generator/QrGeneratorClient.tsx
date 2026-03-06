'use client';

import { useState, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';

type ErrorLevel = 'L' | 'M' | 'Q' | 'H';

const ERROR_LABELS: Record<ErrorLevel, string> = { L: 'L (7%)', M: 'M (15%)', Q: 'Q (25%)', H: 'H (30%)' };

interface QrGeneratorClientProps {
  dict?: Record<string, string>;
}

export default function QrGeneratorClient({ dict }: QrGeneratorClientProps) {
  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;
  const [text, setText] = useState('https://devdogu.vercel.app');
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>('M');
  const [dataUrl, setDataUrl] = useState('');
  const [error, setError] = useState('');

  const generate = useCallback(async () => {
    if (!text.trim()) { setDataUrl(''); setError(''); return; }
    try {
      const url = await QRCode.toDataURL(text, {
        width: size, margin: 2, errorCorrectionLevel: errorLevel,
        color: { dark: '#000000', light: '#ffffff' },
      });
      setDataUrl(url);
      setError('');
    } catch {
      setError(t('qrError', 'QR코드를 생성할 수 없습니다. 입력 데이터가 너무 길 수 있습니다.'));
      setDataUrl('');
    }
  }, [text, size, errorLevel]);

  useEffect(() => { generate(); }, [generate]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">{t('textOrUrl', '텍스트 또는 URL')}</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t('qrPlaceholder', 'QR코드로 변환할 텍스트나 URL을 입력하세요...')} className="input-area min-h-[120px]" spellCheck={false} />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-[var(--color-text-secondary)]">{t('size', '크기')}</label>
              <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30">
                {[128, 256, 512, 1024].map((s) => (<option key={s} value={s}>{s}x{s}</option>))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-[var(--color-text-secondary)]">{t('errorCorrection', '오류 복원')}</label>
              <select value={errorLevel} onChange={(e) => setErrorLevel(e.target.value as ErrorLevel)} className="px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30">
                {Object.entries(ERROR_LABELS).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          {dataUrl ? (
            <>
              <div className="p-4 bg-white rounded-xl">
                <img src={dataUrl} alt="QR Code" width={size > 512 ? 512 : size} height={size > 512 ? 512 : size} />
              </div>
              <button onClick={handleDownload} className="btn-primary">{t('downloadPng', 'PNG 다운로드')}</button>
            </>
          ) : (
            <div className="w-64 h-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl flex items-center justify-center text-[var(--color-text-secondary)] text-sm">{t('qrPlaceholderDisplay', 'QR코드가 여기에 표시됩니다')}</div>
          )}
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
