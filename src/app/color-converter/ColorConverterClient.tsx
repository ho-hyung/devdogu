'use client';

import { useState, useCallback } from 'react';

interface RGB { r: number; g: number; b: number }
interface HSL { h: number; s: number; l: number }

function hexToRgb(hex: string): RGB | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r: number, g: number, b: number): HSL {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): RGB {
  const sn = s / 100, ln = l / 100;
  if (sn === 0) { const v = Math.round(ln * 255); return { r: v, g: v, b: v }; }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const hn = h / 360;
  return {
    r: Math.round(hue2rgb(p, q, hn + 1/3) * 255),
    g: Math.round(hue2rgb(p, q, hn) * 255),
    b: Math.round(hue2rgb(p, q, hn - 1/3) * 255),
  };
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, Math.round(v)));

interface ColorConverterClientProps {
  dict?: Record<string, string>;
}

export default function ColorConverterClient({ dict }: ColorConverterClientProps) {
  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;
  const [hex, setHex] = useState('#338dff');
  const [r, setR] = useState(51); const [g, setG] = useState(141); const [b, setB] = useState(255);
  const [h, setH] = useState(217); const [s, setS] = useState(100); const [l, setL] = useState(60);
  const [copied, setCopied] = useState('');

  const updateFromHex = useCallback((value: string) => {
    setHex(value);
    const rgb = hexToRgb(value);
    if (!rgb) return;
    setR(rgb.r); setG(rgb.g); setB(rgb.b);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setH(hsl.h); setS(hsl.s); setL(hsl.l);
  }, []);

  const updateFromRgb = useCallback((nr: number, ng: number, nb: number) => {
    nr = clamp(nr, 0, 255); ng = clamp(ng, 0, 255); nb = clamp(nb, 0, 255);
    setR(nr); setG(ng); setB(nb);
    setHex(rgbToHex(nr, ng, nb));
    const hsl = rgbToHsl(nr, ng, nb);
    setH(hsl.h); setS(hsl.s); setL(hsl.l);
  }, []);

  const updateFromHsl = useCallback((nh: number, ns: number, nl: number) => {
    nh = clamp(nh, 0, 360); ns = clamp(ns, 0, 100); nl = clamp(nl, 0, 100);
    setH(nh); setS(ns); setL(nl);
    const rgb = hslToRgb(nh, ns, nl);
    setR(rgb.r); setG(rgb.g); setB(rgb.b);
    setHex(rgbToHex(rgb.r, rgb.g, rgb.b));
  }, []);

  const handleCopy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const cssRgb = `rgb(${r}, ${g}, ${b})`;
  const cssHsl = `hsl(${h}, ${s}%, ${l}%)`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-xl border border-[var(--color-border)] shrink-0" style={{ backgroundColor: hex }} />
        <div className="space-y-2">
          <input type="color" value={hex} onChange={(e) => updateFromHex(e.target.value)} className="w-12 h-10 rounded cursor-pointer border border-[var(--color-border)]" />
          <p className="text-xs text-[var(--color-text-secondary)]">{t('colorPicker', '컬러 피커')}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-[var(--color-text-secondary)]">HEX</span>
            <button onClick={() => handleCopy(hex, 'hex')} className="text-xs text-brand-500 hover:text-brand-400">{copied === 'hex' ? t('copied', '✓ 복사됨') : t('copy', '복사')}</button>
          </div>
          <input type="text" value={hex} onChange={(e) => updateFromHex(e.target.value)} className="w-full px-3 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
        </div>
        <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-[var(--color-text-secondary)]">RGB</span>
            <button onClick={() => handleCopy(cssRgb, 'rgb')} className="text-xs text-brand-500 hover:text-brand-400">{copied === 'rgb' ? t('copied', '✓ 복사됨') : t('copy', '복사')}</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'R', value: r, set: (v: number) => updateFromRgb(v, g, b) },
              { label: 'G', value: g, set: (v: number) => updateFromRgb(r, v, b) },
              { label: 'B', value: b, set: (v: number) => updateFromRgb(r, g, v) },
            ].map((ch) => (
              <div key={ch.label}>
                <label className="text-xs text-[var(--color-text-secondary)]">{ch.label}</label>
                <input type="number" min={0} max={255} value={ch.value} onChange={(e) => ch.set(parseInt(e.target.value) || 0)} className="w-full px-2 py-1.5 bg-[var(--color-bg)] border border-[var(--color-border)] rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-[var(--color-text-secondary)]">HSL</span>
            <button onClick={() => handleCopy(cssHsl, 'hsl')} className="text-xs text-brand-500 hover:text-brand-400">{copied === 'hsl' ? t('copied', '✓ 복사됨') : t('copy', '복사')}</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'H', value: h, max: 360, set: (v: number) => updateFromHsl(v, s, l) },
              { label: 'S%', value: s, max: 100, set: (v: number) => updateFromHsl(h, v, l) },
              { label: 'L%', value: l, max: 100, set: (v: number) => updateFromHsl(h, s, v) },
            ].map((ch) => (
              <div key={ch.label}>
                <label className="text-xs text-[var(--color-text-secondary)]">{ch.label}</label>
                <input type="number" min={0} max={ch.max} value={ch.value} onChange={(e) => ch.set(parseInt(e.target.value) || 0)} className="w-full px-2 py-1.5 bg-[var(--color-bg)] border border-[var(--color-border)] rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg space-y-2">
        <span className="text-xs font-semibold uppercase text-[var(--color-text-secondary)]">{t('cssCode', 'CSS 코드')}</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-sm">
          {[{ label: 'HEX', value: hex }, { label: 'RGB', value: cssRgb }, { label: 'HSL', value: cssHsl }].map((item) => (
            <button key={item.label} onClick={() => handleCopy(item.value, `css-${item.label}`)} className="px-3 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg hover:border-brand-500/50 transition-colors text-left" title={t('clickToCopy', '클릭하여 복사')}>
              {copied === `css-${item.label}` ? t('copied', '✓ 복사됨') : item.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
