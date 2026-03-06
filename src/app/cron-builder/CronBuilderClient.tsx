'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';

type FieldMode = 'every' | 'specific' | 'range' | 'interval';

interface FieldState {
  mode: FieldMode;
  specific: number[];
  rangeFrom: number;
  rangeTo: number;
  interval: number;
}

interface FieldConfig {
  label: string;
  min: number;
  max: number;
  labels?: string[];
}

const FIELD_CONFIGS: FieldConfig[] = [
  { label: '분', min: 0, max: 59 },
  { label: '시', min: 0, max: 23 },
  { label: '일', min: 1, max: 31 },
  {
    label: '월',
    min: 1,
    max: 12,
    labels: [
      '',
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
  },
  {
    label: '요일',
    min: 0,
    max: 6,
    labels: ['일', '월', '화', '수', '목', '금', '토'],
  },
];

const PRESETS: { label: string; expression: string }[] = [
  { label: '매분', expression: '* * * * *' },
  { label: '매시간', expression: '0 * * * *' },
  { label: '매일 자정', expression: '0 0 * * *' },
  { label: '매주 월요일', expression: '0 0 * * 1' },
  { label: '매월 1일', expression: '0 0 1 * *' },
];

function createDefaultField(): FieldState {
  return {
    mode: 'every',
    specific: [],
    rangeFrom: 0,
    rangeTo: 0,
    interval: 1,
  };
}

function fieldToExpression(field: FieldState, config: FieldConfig): string {
  switch (field.mode) {
    case 'every':
      return '*';
    case 'specific':
      if (field.specific.length === 0) return '*';
      return [...field.specific].sort((a, b) => a - b).join(',');
    case 'range':
      return `${field.rangeFrom}-${field.rangeTo}`;
    case 'interval':
      return `*/${field.interval}`;
    default:
      return '*';
  }
}

function parseExpressionToFields(expression: string): FieldState[] {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) {
    return Array.from({ length: 5 }, () => createDefaultField());
  }

  return parts.map((part, i) => {
    const config = FIELD_CONFIGS[i];
    const field = createDefaultField();

    if (part === '*') {
      return { ...field, mode: 'every' as FieldMode };
    }

    if (part.startsWith('*/')) {
      const interval = parseInt(part.slice(2), 10);
      if (!isNaN(interval)) {
        return { ...field, mode: 'interval' as FieldMode, interval };
      }
    }

    if (part.includes('-') && !part.includes(',')) {
      const [from, to] = part.split('-').map(Number);
      if (!isNaN(from) && !isNaN(to)) {
        return {
          ...field,
          mode: 'range' as FieldMode,
          rangeFrom: from,
          rangeTo: to,
        };
      }
    }

    if (part.includes(',') || /^\d+$/.test(part)) {
      const values = part
        .split(',')
        .map(Number)
        .filter((n) => !isNaN(n));
      if (values.length > 0) {
        return { ...field, mode: 'specific' as FieldMode, specific: values };
      }
    }

    return field;
  });
}

function describeCron(parts: string[]): string {
  if (parts.length !== 5) return '';

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

  if (parts.every((p) => p === '*')) return '매분 실행';

  const segments: string[] = [];

  // 월
  if (month !== '*') {
    if (month.startsWith('*/')) {
      segments.push(`${month.slice(2)}개월마다`);
    } else if (month.includes('-')) {
      const [from, to] = month.split('-');
      segments.push(`${from}월부터 ${to}월까지`);
    } else {
      const months = month.split(',').map((m) => `${m}월`);
      segments.push(months.join(', '));
    }
  }

  // 요일
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  if (dayOfWeek !== '*') {
    if (dayOfWeek.startsWith('*/')) {
      segments.push(`${dayOfWeek.slice(2)}일 간격 요일`);
    } else if (dayOfWeek.includes('-')) {
      const [from, to] = dayOfWeek.split('-').map(Number);
      segments.push(
        `${dayNames[from] ?? from}~${dayNames[to] ?? to}요일`
      );
    } else {
      const days = dayOfWeek
        .split(',')
        .map((d) => `${dayNames[Number(d)] ?? d}요일`);
      segments.push(days.join(', '));
    }
  }

  // 일
  if (dayOfMonth !== '*') {
    if (dayOfMonth.startsWith('*/')) {
      segments.push(`${dayOfMonth.slice(2)}일마다`);
    } else if (dayOfMonth.includes('-')) {
      const [from, to] = dayOfMonth.split('-');
      segments.push(`${from}일부터 ${to}일까지`);
    } else {
      const days = dayOfMonth.split(',').map((d) => `${d}일`);
      segments.push(days.join(', '));
    }
  } else if (dayOfWeek === '*' && month === '*') {
    // 매일
  }

  // 시간 설명
  if (hour === '*' && minute === '*') {
    segments.push('매분');
  } else if (hour === '*' && minute !== '*') {
    if (minute.startsWith('*/')) {
      segments.push(`${minute.slice(2)}분마다`);
    } else if (minute === '0') {
      segments.push('매시간 정각');
    } else {
      segments.push(`매시간 ${minute}분`);
    }
  } else if (hour !== '*' && minute !== '*') {
    const formatHour = (h: string): string => {
      const num = Number(h);
      if (isNaN(num)) return `${h}시`;
      if (num === 0) return '자정(0시)';
      if (num === 12) return '정오(12시)';
      if (num < 12) return `오전 ${num}시`;
      return `오후 ${num - 12}시`;
    };

    if (hour.startsWith('*/')) {
      const min = minute === '0' ? '정각' : `${minute}분`;
      segments.push(`${hour.slice(2)}시간마다 ${min}에`);
    } else if (hour.includes('-')) {
      const [from, to] = hour.split('-');
      const min = minute === '0' ? '' : ` ${minute}분`;
      segments.push(`${formatHour(from)}부터 ${formatHour(to)}까지${min}`);
    } else if (hour.includes(',')) {
      const hours = hour.split(',').map(formatHour);
      const min = minute === '0' ? '' : ` ${minute}분`;
      segments.push(`${hours.join(', ')}${min}`);
    } else {
      const min = minute === '0' ? '' : ` ${minute}분`;
      segments.push(`${formatHour(hour)}${min}에`);
    }
  } else if (hour !== '*' && minute === '*') {
    if (hour.startsWith('*/')) {
      segments.push(`${hour.slice(2)}시간마다 매분`);
    } else {
      segments.push(`${hour}시 매분`);
    }
  }

  // 주기 요약 prefix
  let prefix = '';
  if (month === '*' && dayOfMonth === '*' && dayOfWeek === '*') {
    prefix = '매일 ';
  } else if (month === '*' && dayOfMonth === '*' && dayOfWeek !== '*') {
    prefix = '매주 ';
  } else if (month === '*' && dayOfMonth !== '*' && dayOfWeek === '*') {
    prefix = '매월 ';
  }

  const timeDesc = segments.join(' ');
  return `${prefix}${timeDesc}에 실행`;
}

function matchesCronField(value: number, field: string): boolean {
  if (field === '*') return true;

  if (field.startsWith('*/')) {
    const interval = parseInt(field.slice(2), 10);
    return value % interval === 0;
  }

  if (field.includes(',')) {
    return field.split(',').some((v) => Number(v) === value);
  }

  if (field.includes('-')) {
    const [from, to] = field.split('-').map(Number);
    return value >= from && value <= to;
  }

  return Number(field) === value;
}

function getNextExecutions(cronExpression: string, count: number): Date[] {
  const parts = cronExpression.trim().split(/\s+/);
  if (parts.length !== 5) return [];

  const [minuteField, hourField, dayOfMonthField, monthField, dayOfWeekField] =
    parts;
  const results: Date[] = [];
  const now = new Date();
  const candidate = new Date(now.getTime());

  // 다음 분부터 시작
  candidate.setSeconds(0, 0);
  candidate.setMinutes(candidate.getMinutes() + 1);

  const maxIterations = 525600; // 1년치 분
  let iterations = 0;

  while (results.length < count && iterations < maxIterations) {
    iterations++;

    const month = candidate.getMonth() + 1;
    const dayOfMonth = candidate.getDate();
    const dayOfWeek = candidate.getDay();
    const hour = candidate.getHours();
    const minute = candidate.getMinutes();

    if (
      matchesCronField(month, monthField) &&
      matchesCronField(dayOfMonth, dayOfMonthField) &&
      matchesCronField(dayOfWeek, dayOfWeekField) &&
      matchesCronField(hour, hourField) &&
      matchesCronField(minute, minuteField)
    ) {
      results.push(new Date(candidate.getTime()));
    }

    candidate.setMinutes(candidate.getMinutes() + 1);
  }

  return results;
}

function range(min: number, max: number): number[] {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}

export default function CronBuilderClient() {
  const [fields, setFields] = useState<FieldState[]>(
    Array.from({ length: 5 }, () => createDefaultField())
  );
  const [copied, setCopied] = useState(false);

  const expression = useMemo(
    () =>
      fields
        .map((field, i) => fieldToExpression(field, FIELD_CONFIGS[i]))
        .join(' '),
    [fields]
  );

  const parts = useMemo(() => expression.split(' '), [expression]);

  const description = useMemo(() => describeCron(parts), [parts]);

  const nextExecutions = useMemo(
    () => getNextExecutions(expression, 5),
    [expression]
  );

  const updateField = useCallback(
    (index: number, updates: Partial<FieldState>) => {
      setFields((prev) =>
        prev.map((f, i) => (i === index ? { ...f, ...updates } : f))
      );
    },
    []
  );

  const toggleSpecific = useCallback(
    (fieldIndex: number, value: number) => {
      setFields((prev) =>
        prev.map((f, i) => {
          if (i !== fieldIndex) return f;
          const exists = f.specific.includes(value);
          return {
            ...f,
            specific: exists
              ? f.specific.filter((v) => v !== value)
              : [...f.specific, value],
          };
        })
      );
    },
    []
  );

  const applyPreset = useCallback((expr: string) => {
    setFields(parseExpressionToFields(expr));
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(expression);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // 클립보드 접근 실패 시 무시
    }
  }, [expression]);

  const formatDate = (date: Date): string => {
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* Cron Expression Display */}
      <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-center">
        <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
          Cron 표현식
        </p>
        <div className="flex items-center justify-center gap-3">
          <code className="font-mono text-3xl md:text-4xl font-bold text-brand-500 tracking-wider">
            {expression}
          </code>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-surface)] transition-colors"
          >
            {copied ? '복사됨' : '복사'}
          </button>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] mt-3">
          {description}
        </p>
        <div className="flex items-center justify-center gap-1 mt-2 text-xs text-[var(--color-text-secondary)] font-mono">
          <span className="px-1.5 py-0.5 bg-brand-500/10 text-brand-500 rounded">
            {parts[0]}
          </span>
          <span className="px-1.5 py-0.5 bg-brand-500/10 text-brand-500 rounded">
            {parts[1]}
          </span>
          <span className="px-1.5 py-0.5 bg-brand-500/10 text-brand-500 rounded">
            {parts[2]}
          </span>
          <span className="px-1.5 py-0.5 bg-brand-500/10 text-brand-500 rounded">
            {parts[3]}
          </span>
          <span className="px-1.5 py-0.5 bg-brand-500/10 text-brand-500 rounded">
            {parts[4]}
          </span>
        </div>
        <div className="flex items-center justify-center gap-1 mt-1 text-[10px] text-[var(--color-text-secondary)]">
          <span className="w-8 text-center">분</span>
          <span className="w-8 text-center">시</span>
          <span className="w-8 text-center">일</span>
          <span className="w-8 text-center">월</span>
          <span className="w-8 text-center">요일</span>
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.expression}
            onClick={() => applyPreset(preset.expression)}
            className="px-3 py-1.5 text-xs border border-[var(--color-border)] rounded-lg hover:border-brand-500 hover:text-brand-500 transition-colors"
          >
            {preset.label}
            <span className="ml-1.5 font-mono text-[var(--color-text-secondary)]">
              {preset.expression}
            </span>
          </button>
        ))}
      </div>

      {/* Field Editors */}
      <div className="space-y-4">
        {FIELD_CONFIGS.map((config, index) => (
          <FieldEditor
            key={config.label}
            config={config}
            state={fields[index]}
            onUpdateMode={(mode) => updateField(index, { mode })}
            onUpdateRangeFrom={(rangeFrom) =>
              updateField(index, { rangeFrom })
            }
            onUpdateRangeTo={(rangeTo) => updateField(index, { rangeTo })}
            onUpdateInterval={(interval) => updateField(index, { interval })}
            onToggleSpecific={(value) => toggleSpecific(index, value)}
          />
        ))}
      </div>

      {/* Next Executions */}
      <div className="p-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
        <h3 className="font-semibold text-sm mb-3">
          다음 5회 실행 시간
        </h3>
        {nextExecutions.length > 0 ? (
          <ol className="space-y-2">
            {nextExecutions.map((date, i) => (
              <li
                key={date.getTime()}
                className="flex items-center gap-3 text-sm font-mono"
              >
                <span className="text-xs text-[var(--color-text-secondary)] w-5 text-right">
                  {i + 1}.
                </span>
                <span>{formatDate(date)}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-[var(--color-text-secondary)]">
            1년 내 실행 일정이 없습니다.
          </p>
        )}
      </div>

      {/* Link to Cheatsheet */}
      <div className="text-center">
        <Link
          href="/cron-cheatsheet"
          className="inline-flex items-center gap-1.5 text-sm text-brand-500 hover:text-brand-400 transition-colors"
        >
          Cron 표현식 문법 가이드 보기 →
        </Link>
      </div>
    </div>
  );
}

function FieldEditor({
  config,
  state,
  onUpdateMode,
  onUpdateRangeFrom,
  onUpdateRangeTo,
  onUpdateInterval,
  onToggleSpecific,
}: {
  config: FieldConfig;
  state: FieldState;
  onUpdateMode: (mode: FieldMode) => void;
  onUpdateRangeFrom: (v: number) => void;
  onUpdateRangeTo: (v: number) => void;
  onUpdateInterval: (v: number) => void;
  onToggleSpecific: (v: number) => void;
}) {
  const modes: { value: FieldMode; label: string }[] = [
    { value: 'every', label: '모든 값 (*)' },
    { value: 'specific', label: '특정 값' },
    { value: 'range', label: '범위' },
    { value: 'interval', label: '간격 (*/)' },
  ];

  const values = range(config.min, config.max);

  const getLabel = (v: number): string => {
    if (config.labels) return config.labels[v] ?? String(v);
    return String(v);
  };

  return (
    <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-semibold text-sm min-w-[3rem]">
          {config.label}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {modes.map((m) => (
            <button
              key={m.value}
              onClick={() => onUpdateMode(m.value)}
              className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                state.mode === m.value
                  ? 'border-brand-500 bg-brand-500/10 text-brand-500'
                  : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-brand-500/50'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {state.mode === 'specific' && (
        <div className="flex flex-wrap gap-1 mt-2">
          {values.map((v) => (
            <button
              key={v}
              onClick={() => onToggleSpecific(v)}
              className={`min-w-[2.25rem] px-1.5 py-1 text-xs rounded border transition-colors ${
                state.specific.includes(v)
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-brand-500/50'
              }`}
            >
              {getLabel(v)}
            </button>
          ))}
        </div>
      )}

      {state.mode === 'range' && (
        <div className="flex items-center gap-2 mt-2">
          <select
            value={state.rangeFrom}
            onChange={(e) => onUpdateRangeFrom(Number(e.target.value))}
            className="px-2 py-1.5 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          >
            {values.map((v) => (
              <option key={v} value={v}>
                {getLabel(v)}
              </option>
            ))}
          </select>
          <span className="text-sm text-[var(--color-text-secondary)]">
            부터
          </span>
          <select
            value={state.rangeTo}
            onChange={(e) => onUpdateRangeTo(Number(e.target.value))}
            className="px-2 py-1.5 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          >
            {values.map((v) => (
              <option key={v} value={v}>
                {getLabel(v)}
              </option>
            ))}
          </select>
          <span className="text-sm text-[var(--color-text-secondary)]">
            까지
          </span>
        </div>
      )}

      {state.mode === 'interval' && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-[var(--color-text-secondary)]">
            매
          </span>
          <input
            type="number"
            value={state.interval}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1) {
                onUpdateInterval(val);
              }
            }}
            min={1}
            max={config.max}
            className="w-20 px-2 py-1.5 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
          <span className="text-sm text-[var(--color-text-secondary)]">
            {config.label === '분'
              ? '분마다'
              : config.label === '시'
                ? '시간마다'
                : config.label === '일'
                  ? '일마다'
                  : config.label === '월'
                    ? '개월마다'
                    : '요일마다'}
          </span>
        </div>
      )}
    </div>
  );
}
