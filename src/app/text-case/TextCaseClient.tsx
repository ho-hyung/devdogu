'use client';

import { useState, useMemo, useCallback } from 'react';

function splitIntoWords(input: string): string[] {
  if (!input.trim()) return [];

  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[_\-./]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

function toCamelCase(words: string[]): string {
  if (words.length === 0) return '';
  return words
    .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join('');
}

function toPascalCase(words: string[]): string {
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function toSnakeCase(words: string[]): string {
  return words.join('_');
}

function toConstantCase(words: string[]): string {
  return words.map((w) => w.toUpperCase()).join('_');
}

function toKebabCase(words: string[]): string {
  return words.join('-');
}

function toDotCase(words: string[]): string {
  return words.join('.');
}

function toTitleCase(words: string[]): string {
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function toSentenceCase(words: string[]): string {
  if (words.length === 0) return '';
  return words
    .map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ');
}

function toLowerCase(words: string[]): string {
  return words.join(' ');
}

function toUpperCase(words: string[]): string {
  return words.map((w) => w.toUpperCase()).join(' ');
}

interface CaseDefinition {
  readonly label: string;
  readonly example: string;
  readonly convert: (words: string[]) => string;
}

const CASES: readonly CaseDefinition[] = [
  { label: 'camelCase', example: 'myVariableName', convert: toCamelCase },
  { label: 'PascalCase', example: 'MyVariableName', convert: toPascalCase },
  { label: 'snake_case', example: 'my_variable_name', convert: toSnakeCase },
  { label: 'CONSTANT_CASE', example: 'MY_VARIABLE_NAME', convert: toConstantCase },
  { label: 'kebab-case', example: 'my-variable-name', convert: toKebabCase },
  { label: 'dot.case', example: 'my.variable.name', convert: toDotCase },
  { label: 'Title Case', example: 'My Variable Name', convert: toTitleCase },
  { label: 'Sentence case', example: 'My variable name', convert: toSentenceCase },
  { label: 'lowercase', example: 'my variable name', convert: toLowerCase },
  { label: 'UPPERCASE', example: 'MY VARIABLE NAME', convert: toUpperCase },
] as const;

interface TextCaseClientProps {
  dict?: Record<string, string>;
}

export default function TextCaseClient({ dict }: TextCaseClientProps) {
  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;
  const [input, setInput] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const words = useMemo(() => splitIntoWords(input), [input]);

  const results = useMemo(
    () => CASES.map((c) => ({ label: c.label, example: c.example, value: c.convert(words) })),
    [words],
  );

  const handleCopy = useCallback(async (value: string, index: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      throw new Error(t('clipboardError', '클립보드 복사에 실패했습니다.'));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2 text-[var(--color-text-secondary)]">
          {t('textToConvert', '변환할 텍스트')}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('textPlaceholder', '텍스트를 입력하세요 (예: hello world, helloWorld, hello_world)')}
          rows={3}
          className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-brand-500/30 placeholder:text-[var(--color-text-secondary)]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {results.map((result, index) => (
          <div
            key={result.label}
            className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg space-y-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold">{result.label}</span>
                {!input.trim() && (
                  <span className="ml-2 text-xs text-[var(--color-text-secondary)]">
                    {result.example}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleCopy(result.value, index)}
                disabled={!result.value}
                className="text-xs text-brand-500 hover:text-brand-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {copiedIndex === index ? t('copied', '복사됨') : t('copy', '복사')}
              </button>
            </div>
            <div className="px-3 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg font-mono text-sm min-h-[2.25rem] break-all">
              {result.value || (
                <span className="text-[var(--color-text-secondary)]">-</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
