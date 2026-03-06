'use client';

import { useState, useCallback, useMemo } from 'react';

type Mode = 'paragraphs' | 'sentences' | 'words';

const MODE_LABELS: Record<Mode, string> = {
  paragraphs: '문단',
  sentences: '문장',
  words: '단어',
};

const MODE_LIMITS: Record<Mode, { min: number; max: number }> = {
  paragraphs: { min: 1, max: 100 },
  sentences: { min: 1, max: 500 },
  words: { min: 1, max: 5000 },
};

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et',
  'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis',
  'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex',
  'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in',
  'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'fugiat',
  'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non',
  'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit',
  'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos', 'accusamus',
  'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis', 'praesentium',
  'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos', 'dolores',
  'quas', 'molestias', 'excepturi', 'obcaecati', 'cupiditate', 'provident',
  'similique', 'mollitia', 'animi', 'minima', 'nihil', 'impedit', 'quo',
  'minus', 'quod', 'maxime', 'placeat', 'facere', 'possimus', 'omnis',
  'voluptas', 'assumenda', 'repellendus', 'temporibus', 'autem', 'quibusdam',
  'officiis', 'debitis', 'aut', 'rerum', 'necessitatibus', 'saepe',
  'eveniet', 'voluptates', 'repudiandae', 'recusandae', 'itaque',
  'earum', 'hic', 'tenetur', 'sapiente', 'delectus', 'reiciendis',
  'maiores', 'alias', 'consequatur', 'perferendis', 'doloribus', 'asperiores',
  'repellat',
];

const CLASSIC_OPENING = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateSentence(): string {
  const wordCount = getRandomInt(6, 15);
  const words = Array.from({ length: wordCount }, () => pickRandomWord());
  const sentence = capitalize(words.join(' '));

  const hasComma = wordCount > 8 && Math.random() > 0.5;
  if (hasComma) {
    const commaPos = getRandomInt(3, wordCount - 3);
    const parts = sentence.split(' ');
    const withComma = [...parts.slice(0, commaPos), parts[commaPos] + ',', ...parts.slice(commaPos + 1)];
    return withComma.join(' ') + '.';
  }

  return sentence + '.';
}

function generateParagraph(): string {
  const sentenceCount = getRandomInt(4, 8);
  return Array.from({ length: sentenceCount }, () => generateSentence()).join(' ');
}

function generateText(mode: Mode, count: number, startWithClassic: boolean): string {
  if (mode === 'words') {
    const words = Array.from({ length: count }, () => pickRandomWord());
    if (startWithClassic) {
      const classicWords = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
      const replacementCount = Math.min(classicWords.length, count);
      return capitalize(
        [...classicWords.slice(0, replacementCount), ...words.slice(replacementCount)].join(' ')
      );
    }
    return capitalize(words.join(' '));
  }

  if (mode === 'sentences') {
    const sentences = Array.from({ length: count }, () => generateSentence());
    if (startWithClassic) {
      return [CLASSIC_OPENING, ...sentences.slice(1)].join(' ');
    }
    return sentences.join(' ');
  }

  const paragraphs = Array.from({ length: count }, () => generateParagraph());
  if (startWithClassic) {
    const firstParagraph = paragraphs[0];
    const restOfFirst = firstParagraph.split('. ').slice(1).join('. ');
    const updatedFirst = restOfFirst
      ? CLASSIC_OPENING + ' ' + restOfFirst
      : CLASSIC_OPENING;
    return [updatedFirst, ...paragraphs.slice(1)].join('\n\n');
  }
  return paragraphs.join('\n\n');
}

function countWords(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

interface LoremIpsumClientProps {
  dict?: Record<string, string>;
}

export default function LoremIpsumClient({ dict }: LoremIpsumClientProps) {
  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;
  const [mode, setMode] = useState<Mode>('paragraphs');
  const [count, setCount] = useState(3);
  const [startWithClassic, setStartWithClassic] = useState(true);
  const [output, setOutput] = useState(() => generateText('paragraphs', 3, true));
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const words = countWords(output);
    const chars = output.length;
    return { words, chars };
  }, [output]);

  const handleGenerate = useCallback(() => {
    setOutput(generateText(mode, count, startWithClassic));
    setCopied(false);
  }, [mode, count, startWithClassic]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCountChange = (value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    const limits = MODE_LIMITS[mode];
    setCount(Math.max(limits.min, Math.min(limits.max, num)));
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    const limits = MODE_LIMITS[newMode];
    const defaultCounts: Record<Mode, number> = {
      paragraphs: 3,
      sentences: 5,
      words: 50,
    };
    const newCount = defaultCounts[newMode];
    setCount(newCount);
    setOutput(generateText(newMode, newCount, startWithClassic));
    setCopied(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-1">
          {(['paragraphs', 'sentences', 'words'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === m
                  ? 'bg-brand-500/10 text-brand-500'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
              }`}
            >
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>
        <button onClick={handleGenerate} className="btn-primary">
          {t('generate', '생성하기')}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-[var(--color-text-secondary)]">{t('count', '개수')}</label>
          <input
            type="number"
            value={count}
            onChange={(e) => handleCountChange(e.target.value)}
            min={MODE_LIMITS[mode].min}
            max={MODE_LIMITS[mode].max}
            className="w-24 px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
          <span className="text-xs text-[var(--color-text-secondary)]">
            {MODE_LIMITS[mode].min}~{MODE_LIMITS[mode].max}
          </span>
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={startWithClassic}
            onChange={(e) => setStartWithClassic(e.target.checked)}
            className="w-4 h-4 rounded border-[var(--color-border)] text-brand-500 focus:ring-brand-500/30"
          />
          <span className="text-sm text-[var(--color-text-secondary)]">
            {t('startWithClassic', '"Lorem ipsum dolor sit amet..."으로 시작')}
          </span>
        </label>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
            {t('generatedResult', '생성 결과')}
          </label>
          <button
            onClick={handleCopy}
            className="text-xs text-brand-500 hover:text-brand-400 transition-colors"
          >
            {copied ? t('copied', '복사됨') : t('copy', '복사')}
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          rows={12}
          className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-brand-500/30 custom-scrollbar"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
          <span className="text-xs text-[var(--color-text-secondary)]">{t('wordCount', '단어 수')} </span>
          <span className="text-sm font-mono font-medium">{stats.words.toLocaleString()}</span>
        </div>
        <div className="px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
          <span className="text-xs text-[var(--color-text-secondary)]">{t('charCount', '글자 수')} </span>
          <span className="text-sm font-mono font-medium">{stats.chars.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
