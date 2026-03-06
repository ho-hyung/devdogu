'use client';

import { useState, useMemo } from 'react';

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4;
  const fixed = pad ? padded + '='.repeat(4 - pad) : padded;
  return decodeURIComponent(
    atob(fixed)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}

export default function JwtDecoderClient() {
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const decoded = useMemo(() => {
    if (!token.trim()) return null;
    const parts = token.trim().split('.');
    if (parts.length !== 3) return { error: 'JWT는 점(.)으로 구분된 3개 부분이 필요합니다.' };

    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));

      // 시간 관련 필드 해석
      const timeFields: Record<string, string> = {};
      for (const key of ['iat', 'exp', 'nbf']) {
        if (typeof payload[key] === 'number') {
          timeFields[key] = new Date(payload[key] * 1000).toLocaleString('ko-KR');
        }
      }

      const isExpired = payload.exp ? Date.now() / 1000 > payload.exp : null;

      return { header, payload, signature: parts[2], timeFields, isExpired };
    } catch {
      return { error: '유효하지 않은 JWT 형식입니다.' };
    }
  }, [token]);

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSample = () => {
    // 실제 디코딩 가능한 샘플 JWT (만료되지 않은 더미 토큰)
    setToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRldlRvb2xCb3giLCJpYXQiOjE3MDk1MTIwMDAsImV4cCI6MTc0MTA0ODAwMCwicm9sZSI6ImRldmVsb3BlciJ9.placeholder_signature'
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={handleSample} className="btn-secondary text-[var(--color-text-secondary)]">
          샘플 토큰
        </button>
        <button onClick={() => { setToken(''); }} className="btn-secondary">
          초기화
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
          JWT 토큰
        </label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIs..."
          className="input-area min-h-[120px] font-mono text-xs break-all"
          spellCheck={false}
        />
      </div>

      {decoded && 'error' in decoded && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-500">✕ {decoded.error}</p>
        </div>
      )}

      {decoded && 'header' in decoded && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-red-400 uppercase tracking-wider">Header</label>
              <button
                onClick={() => handleCopy(JSON.stringify(decoded.header, null, 2), 'header')}
                className="text-xs text-brand-500 hover:text-brand-400"
              >
                {copied === 'header' ? '✓ 복사됨' : '복사'}
              </button>
            </div>
            <pre className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg font-mono text-sm overflow-auto custom-scrollbar">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-violet-400 uppercase tracking-wider">Payload</label>
                {decoded.isExpired !== null && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${decoded.isExpired ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                    {decoded.isExpired ? '만료됨' : '유효'}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleCopy(JSON.stringify(decoded.payload, null, 2), 'payload')}
                className="text-xs text-brand-500 hover:text-brand-400"
              >
                {copied === 'payload' ? '✓ 복사됨' : '복사'}
              </button>
            </div>
            <pre className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg font-mono text-sm overflow-auto custom-scrollbar">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>

          {/* Time fields */}
          {decoded.timeFields && Object.keys(decoded.timeFields).length > 0 && (
            <div className="lg:col-span-2 space-y-2">
              <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                시간 정보
              </label>
              <div className="flex flex-wrap gap-4 text-xs">
                {Object.entries(decoded.timeFields).map(([key, val]) => (
                  <div key={key} className="p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
                    <span className="text-[var(--color-text-secondary)] font-mono">{key}</span>
                    <span className="mx-2 text-[var(--color-border)]">→</span>
                    <span className="font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
