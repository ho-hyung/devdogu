'use client';

import { useState, useCallback } from 'react';

type Algorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

const ALGORITHMS: Algorithm[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

function computeMD5(input: string): string {
  const bytes = new TextEncoder().encode(input);
  const paddedLen = Math.ceil((bytes.length + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLen);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  const dv = new DataView(padded.buffer);
  const bitLen = bytes.length * 8;
  dv.setUint32(paddedLen - 8, bitLen & 0xffffffff, true);
  dv.setUint32(paddedLen - 4, Math.floor(bitLen / 0x100000000), true);

  let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;

  const s = [
    7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,
    5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,
    4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,
    6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21,
  ];
  const K = Array.from({ length: 64 }, (_, i) =>
    Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000)
  );

  for (let offset = 0; offset < paddedLen; offset += 64) {
    const M = new Uint32Array(16);
    for (let j = 0; j < 16; j++) M[j] = dv.getUint32(offset + j * 4, true);

    let A = a0, B = b0, C = c0, D = d0;
    for (let i = 0; i < 64; i++) {
      let F: number, g: number;
      if (i < 16) { F = (B & C) | (~B & D); g = i; }
      else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16; }
      else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16; }
      else { F = C ^ (B | ~D); g = (7 * i) % 16; }
      F = (F + A + K[i] + M[g]) >>> 0;
      A = D; D = C; C = B;
      B = (B + ((F << s[i]) | (F >>> (32 - s[i])))) >>> 0;
    }
    a0 = (a0 + A) >>> 0; b0 = (b0 + B) >>> 0;
    c0 = (c0 + C) >>> 0; d0 = (d0 + D) >>> 0;
  }

  const toHex = (n: number) =>
    [(n & 0xff), (n >> 8) & 0xff, (n >> 16) & 0xff, (n >> 24) & 0xff]
      .map(b => b.toString(16).padStart(2, '0')).join('');
  return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0);
}

async function computeSHA(algorithm: string, input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function computeHash(algorithm: Algorithm, input: string): Promise<string> {
  if (algorithm === 'MD5') return computeMD5(input);
  return computeSHA(algorithm, input);
}

interface HashGeneratorClientProps {
  dict?: Record<string, string>;
}

export default function HashGeneratorClient({ dict }: HashGeneratorClientProps) {
  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<Algorithm>('SHA-256');
  const [results, setResults] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState('');

  const handleHash = useCallback(async () => {
    if (!input) { setResults({}); return; }
    const entries = await Promise.all(
      ALGORITHMS.map(async (alg) => [alg, await computeHash(alg, input)] as const)
    );
    setResults(Object.fromEntries(entries));
  }, [input]);

  const handleCopy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">{t('inputText', '입력 텍스트')}</label>
        <textarea
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleHash(); }}
          placeholder={t('inputPlaceholder', '해시를 생성할 텍스트를 입력하세요...')}
          className="input-area min-h-[150px]" spellCheck={false}
        />
      </div>
      <button onClick={handleHash} className="btn-primary">{t('generateHash', '해시 생성 (⌘+Enter)')}</button>
      {Object.keys(results).length > 0 && (
        <div className="space-y-3">
          {ALGORITHMS.map((alg) => (
            <div key={alg} className={`p-4 bg-[var(--color-surface)] border rounded-lg ${alg === algorithm ? 'border-brand-500/50' : 'border-[var(--color-border)]'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase">{alg}</span>
                <button onClick={() => handleCopy(results[alg], alg)} className="text-xs text-brand-500 hover:text-brand-400 transition-colors">
                  {copied === alg ? t('copied', '✓ 복사됨') : t('copy', '복사')}
                </button>
              </div>
              <p className="font-mono text-sm break-all select-all">{results[alg]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
