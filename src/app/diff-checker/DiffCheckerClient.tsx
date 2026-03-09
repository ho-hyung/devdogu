'use client';

import { useState, useMemo } from 'react';
import CopyButton from '@/components/CopyButton';

interface DiffLine {
  type: 'equal' | 'add' | 'remove';
  content: string;
  oldNum?: number;
  newNum?: number;
}

function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');
  const m = oldLines.length;
  const n = newLines.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = oldLines[i - 1] === newLines[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const result: DiffLine[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      result.unshift({ type: 'equal', content: oldLines[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'add', content: newLines[j - 1] });
      j--;
    } else {
      result.unshift({ type: 'remove', content: oldLines[i - 1] });
      i--;
    }
  }

  let oldNum = 0, newNum = 0;
  return result.map((line) => {
    if (line.type === 'remove') return { ...line, oldNum: ++oldNum };
    if (line.type === 'add') return { ...line, newNum: ++newNum };
    return { ...line, oldNum: ++oldNum, newNum: ++newNum };
  });
}

const LINE_STYLES: Record<DiffLine['type'], string> = {
  equal: '',
  add: 'bg-emerald-500/10 text-emerald-400',
  remove: 'bg-red-500/10 text-red-400',
};

const PREFIX: Record<DiffLine['type'], string> = { equal: ' ', add: '+', remove: '-' };

interface DiffCheckerClientProps {
  dict?: Record<string, string>;
}

export default function DiffCheckerClient({ dict }: DiffCheckerClientProps) {
  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;
  const [oldText, setOldText] = useState('');
  const [newText, setNewText] = useState('');

  const diff = useMemo(() => {
    if (!oldText && !newText) return [];
    return computeDiff(oldText, newText);
  }, [oldText, newText]);

  const stats = useMemo(() => ({
    added: diff.filter(l => l.type === 'add').length,
    removed: diff.filter(l => l.type === 'remove').length,
    unchanged: diff.filter(l => l.type === 'equal').length,
  }), [diff]);

  const diffText = useMemo(() =>
    diff.map((line) => `${PREFIX[line.type]}${line.content}`).join('\n'),
    [diff]
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">{t('originalText', '원본 텍스트')}</label>
          <textarea value={oldText} onChange={(e) => setOldText(e.target.value)} placeholder={t('originalPlaceholder', '원본 텍스트를 입력하세요...')} className="input-area min-h-[200px]" spellCheck={false} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">{t('modifiedText', '수정된 텍스트')}</label>
          <textarea value={newText} onChange={(e) => setNewText(e.target.value)} placeholder={t('modifiedPlaceholder', '수정된 텍스트를 입력하세요...')} className="input-area min-h-[200px]" spellCheck={false} />
        </div>
      </div>
      {diff.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-emerald-400">+{stats.added} {t('added', '추가')}</span>
            <span className="text-red-400">-{stats.removed} {t('removed', '삭제')}</span>
            <span className="text-[var(--color-text-secondary)]">{stats.unchanged} {t('unchanged', '동일')}</span>
          </div>
          <CopyButton text={diffText} label={t('copyDiff', '복사')} copiedLabel={t('copied', '✓ 복사됨')} />
        </div>
      )}
      {diff.length > 0 && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm font-mono">
              <tbody>
                {diff.map((line, i) => (
                  <tr key={i} className={LINE_STYLES[line.type]}>
                    <td className="px-2 py-0.5 text-right text-xs text-[var(--color-text-secondary)] select-none w-10 border-r border-[var(--color-border)]">{line.oldNum ?? ''}</td>
                    <td className="px-2 py-0.5 text-right text-xs text-[var(--color-text-secondary)] select-none w-10 border-r border-[var(--color-border)]">{line.newNum ?? ''}</td>
                    <td className="px-1 py-0.5 text-center select-none w-6 font-bold text-xs">{PREFIX[line.type]}</td>
                    <td className="px-2 py-0.5 whitespace-pre">{line.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
