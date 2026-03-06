'use client';

import { useState, useCallback, useMemo } from 'react';

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

function generatePassword(options: PasswordOptions): string {
  const { length, uppercase, lowercase, numbers, symbols } = options;

  let charset = '';
  if (uppercase) charset += CHAR_SETS.uppercase;
  if (lowercase) charset += CHAR_SETS.lowercase;
  if (numbers) charset += CHAR_SETS.numbers;
  if (symbols) charset += CHAR_SETS.symbols;

  if (charset.length === 0) return '';

  const bytes = crypto.getRandomValues(new Uint32Array(length));
  return Array.from(bytes, (b) => charset[b % charset.length]).join('');
}

type StrengthLevel = 'very-weak' | 'weak' | 'fair' | 'strong' | 'very-strong';

interface StrengthInfo {
  level: StrengthLevel;
  label: string;
  color: string;
  width: string;
}

function evaluateStrength(options: PasswordOptions): StrengthInfo {
  const { length, uppercase, lowercase, numbers, symbols } = options;

  let charsetSize = 0;
  if (uppercase) charsetSize += 26;
  if (lowercase) charsetSize += 26;
  if (numbers) charsetSize += 10;
  if (symbols) charsetSize += 26;

  if (charsetSize === 0) {
    return { level: 'very-weak', label: '매우 약함', color: 'bg-red-500', width: 'w-1/5' };
  }

  const entropy = Math.log2(charsetSize) * length;

  if (entropy < 28) return { level: 'very-weak', label: '매우 약함', color: 'bg-red-500', width: 'w-1/5' };
  if (entropy < 36) return { level: 'weak', label: '약함', color: 'bg-orange-500', width: 'w-2/5' };
  if (entropy < 60) return { level: 'fair', label: '보통', color: 'bg-yellow-500', width: 'w-3/5' };
  if (entropy < 80) return { level: 'strong', label: '강함', color: 'bg-emerald-500', width: 'w-4/5' };
  return { level: 'very-strong', label: '매우 강함', color: 'bg-emerald-400', width: 'w-full' };
}

const OPTION_LABELS: { key: keyof Omit<PasswordOptions, 'length'>; label: string; example: string }[] = [
  { key: 'uppercase', label: '대문자', example: 'A-Z' },
  { key: 'lowercase', label: '소문자', example: 'a-z' },
  { key: 'numbers', label: '숫자', example: '0-9' },
  { key: 'symbols', label: '특수문자', example: '!@#$%' },
];

interface PasswordGeneratorClientProps {
  dict?: Record<string, string>;
}

export default function PasswordGeneratorClient({ dict }: PasswordGeneratorClientProps) {
  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>(() => [generatePassword({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })]);
  const [copied, setCopied] = useState(false);

  const strength = useMemo(() => evaluateStrength(options), [options]);

  const activeCount = [options.uppercase, options.lowercase, options.numbers, options.symbols].filter(Boolean).length;

  const handleGenerate = useCallback(() => {
    const results: string[] = [];
    for (let i = 0; i < count; i++) {
      results.push(generatePassword(options));
    }
    setPasswords(results);
    setCopied(false);
  }, [options, count]);

  const handleOptionToggle = (key: keyof Omit<PasswordOptions, 'length'>) => {
    if (options[key] && activeCount <= 1) return;
    const newOptions = { ...options, [key]: !options[key] };
    setOptions(newOptions);
    const results: string[] = [];
    for (let i = 0; i < count; i++) {
      results.push(generatePassword(newOptions));
    }
    setPasswords(results);
    setCopied(false);
  };

  const handleLengthChange = (value: number) => {
    const clamped = Math.max(4, Math.min(128, value));
    const newOptions = { ...options, length: clamped };
    setOptions(newOptions);
    const results: string[] = [];
    for (let i = 0; i < count; i++) {
      results.push(generatePassword(newOptions));
    }
    setPasswords(results);
    setCopied(false);
  };

  const handleCountChange = (value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    setCount(Math.max(1, Math.min(50, num)));
  };

  const handleCopy = async () => {
    const text = passwords.join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySingle = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Length slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">{t('passwordLength', '비밀번호 길이')}</label>
          <input
            type="number"
            value={options.length}
            onChange={(e) => handleLengthChange(parseInt(e.target.value, 10) || 4)}
            min={4}
            max={128}
            className="w-20 px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg font-mono text-sm text-center focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>
        <input
          type="range"
          min={4}
          max={128}
          value={options.length}
          onChange={(e) => handleLengthChange(parseInt(e.target.value, 10))}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-xs text-[var(--color-text-secondary)]">
          <span>4</span>
          <span>32</span>
          <span>64</span>
          <span>128</span>
        </div>
      </div>

      {/* Character options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {OPTION_LABELS.map(({ key, label, example }) => (
          <button
            key={key}
            onClick={() => handleOptionToggle(key)}
            className={`p-3 rounded-lg border text-sm font-medium transition-colors text-left ${
              options[key]
                ? 'bg-brand-500/10 border-brand-500/30 text-brand-500'
                : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)]'
            } ${options[key] && activeCount <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div>{label}</div>
            <div className="text-xs mt-1 opacity-70 font-mono">{example}</div>
          </button>
        ))}
      </div>

      {/* Count + Generate */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-[var(--color-text-secondary)]">{t('count', '개수')}</label>
          <input
            type="number"
            value={count}
            onChange={(e) => handleCountChange(e.target.value)}
            min={1}
            max={50}
            className="w-20 px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
          <span className="text-xs text-[var(--color-text-secondary)]">1~50</span>
        </div>
        <button onClick={handleGenerate} className="btn-primary">
          {t('generate', '생성하기')}
        </button>
      </div>

      {/* Strength indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--color-text-secondary)]">{t('passwordStrength', '비밀번호 강도')}</span>
          <span className="font-medium">{strength.label}</span>
        </div>
        <div className="h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
          <div className={`h-full ${strength.color} ${strength.width} rounded-full transition-all`} />
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
            {t('generatedResult', '생성 결과')} ({passwords.length}{t('countUnit', '개')})
          </label>
          <button onClick={handleCopy} className="text-xs text-brand-500 hover:text-brand-400 transition-colors">
            {copied ? t('copied', '✓ 복사됨') : t('copyAll', '전체 복사')}
          </button>
        </div>
        {passwords.length === 1 ? (
          <div
            onClick={() => handleCopySingle(passwords[0])}
            className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg font-mono text-lg text-brand-500 cursor-pointer hover:bg-brand-500/5 transition-colors select-all text-center break-all"
            title={t('clickToCopy', '클릭하여 복사')}
          >
            {passwords[0]}
          </div>
        ) : (
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg divide-y divide-[var(--color-border)] max-h-[500px] overflow-y-auto custom-scrollbar">
            {passwords.map((pw, i) => (
              <div
                key={i}
                onClick={() => handleCopySingle(pw)}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-brand-500/5 cursor-pointer transition-colors group"
                title={t('clickToCopy', '클릭하여 복사')}
              >
                <span className="text-xs text-[var(--color-text-secondary)] w-8 text-right shrink-0">{i + 1}</span>
                <span className="font-mono text-sm select-all break-all">{pw}</span>
                <span className="text-xs text-[var(--color-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0">
                  {t('copy', '복사')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
