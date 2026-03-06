'use client';

import { useState } from 'react';

const SQL_KEYWORDS = [
  'SELECT','FROM','WHERE','AND','OR','JOIN','LEFT','RIGHT','INNER','OUTER',
  'FULL','CROSS','ON','ORDER','BY','GROUP','HAVING','LIMIT','OFFSET',
  'INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE','ALTER',
  'DROP','INDEX','AS','IN','NOT','NULL','IS','BETWEEN','LIKE','EXISTS',
  'CASE','WHEN','THEN','ELSE','END','UNION','ALL','DISTINCT','ASC','DESC',
  'COUNT','SUM','AVG','MIN','MAX','WITH','PRIMARY','KEY','FOREIGN',
  'REFERENCES','DEFAULT','CONSTRAINT','UNIQUE','CHECK','CASCADE','IF',
];

const CLAUSE_KEYWORDS = [
  'SELECT','FROM','WHERE','ORDER BY','GROUP BY','HAVING','LIMIT','OFFSET',
  'UNION ALL','UNION','INSERT INTO','VALUES','UPDATE','SET','DELETE FROM',
  'CREATE TABLE','ALTER TABLE','DROP TABLE','WITH',
];

function formatSQL(sql: string): string {
  const strings: string[] = [];
  let s = sql.replace(/'(?:[^'\\]|\\.)*'/g, (m) => {
    strings.push(m);
    return `\x00${strings.length - 1}\x00`;
  });

  s = s.replace(/\s+/g, ' ').trim();

  const kwPattern = new RegExp(`\\b(${SQL_KEYWORDS.join('|')})\\b`, 'gi');
  s = s.replace(kwPattern, (m) => m.toUpperCase());

  for (const kw of CLAUSE_KEYWORDS.filter(k => k.includes(' '))) {
    s = s.replace(new RegExp(`\\b${kw}\\b`, 'g'), `\n${kw}`);
  }
  for (const kw of CLAUSE_KEYWORDS.filter(k => !k.includes(' '))) {
    s = s.replace(new RegExp(`(?<!\\w)${kw}(?!\\w)`, 'g'), `\n${kw}`);
  }

  s = s.replace(/\b((?:LEFT|RIGHT|INNER|OUTER|FULL|CROSS)\s+JOIN)\b/g, '\n$1');
  s = s.replace(/(?<!(LEFT|RIGHT|INNER|OUTER|FULL|CROSS)\s)(?<=\s)JOIN\b/g, '\nJOIN');
  s = s.replace(/\s+AND\b/g, '\n  AND');
  s = s.replace(/\s+OR\b/g, '\n  OR');
  s = s.replace(/\s+ON\b/g, '\n    ON');

  const lines = s.split('\n').map(l => l.trim()).filter(Boolean);
  let output = lines.join('\n');

  strings.forEach((str, i) => {
    output = output.replace(`\x00${i}\x00`, str);
  });

  return output;
}

const SAMPLE = `select u.id, u.name, u.email, o.total from users u left join orders o on u.id = o.user_id where u.active = 1 and o.total > 100 order by o.total desc limit 10`;

interface SqlFormatterClientProps {
  dict?: Record<string, string>;
}

export default function SqlFormatterClient({ dict }: SqlFormatterClientProps) {
  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!input.trim()) return;
    setOutput(formatSQL(input));
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSample = () => {
    setInput(SAMPLE);
    setOutput(formatSQL(SAMPLE));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={handleFormat} className="btn-primary">{t('format', '포맷팅')}</button>
        <button onClick={handleSample} className="btn-secondary">{t('sampleSql', '예시 SQL')}</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">{t('sqlInput', 'SQL 입력')}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleFormat(); }} placeholder={t('sqlPlaceholder', 'SQL 쿼리를 입력하세요...')} className="input-area min-h-[300px]" spellCheck={false} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">{t('formatResult', '포맷팅 결과')}</label>
            {output && (<button onClick={handleCopy} className="text-xs text-brand-500 hover:text-brand-400 transition-colors">{copied ? t('copied', '✓ 복사됨') : t('copy', '복사하기')}</button>)}
          </div>
          <textarea value={output} readOnly placeholder={t('outputPlaceholder', '포맷팅 결과가 여기에 표시됩니다.')} className="input-area min-h-[300px] bg-[var(--color-surface)]" />
        </div>
      </div>
    </div>
  );
}
