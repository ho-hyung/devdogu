'use client';

import { useState, useCallback, useMemo } from 'react';
import yaml from 'js-yaml';

type Direction = 'json-to-yaml' | 'yaml-to-json';

const SAMPLE_JSON = JSON.stringify(
  {
    apiVersion: 'apps/v1',
    kind: 'Deployment',
    metadata: {
      name: 'web-server',
      labels: { app: 'web', env: 'production' },
    },
    spec: {
      replicas: 3,
      selector: { matchLabels: { app: 'web' } },
      template: {
        metadata: { labels: { app: 'web' } },
        spec: {
          containers: [
            {
              name: 'nginx',
              image: 'nginx:1.25',
              ports: [{ containerPort: 80 }],
            },
          ],
        },
      },
    },
  },
  null,
  2,
);

const SAMPLE_YAML = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-server
  labels:
    app: web
    env: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: nginx
          image: "nginx:1.25"
          ports:
            - containerPort: 80`;

interface JsonYamlClientProps {
  dict?: Record<string, string>;
}

export default function JsonYamlClient({ dict }: JsonYamlClientProps) {
  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;
  const [direction, setDirection] = useState<Direction>('json-to-yaml');
  const [leftInput, setLeftInput] = useState('');
  const [copied, setCopied] = useState(false);

  const isJsonToYaml = direction === 'json-to-yaml';

  const { output, error } = useMemo(() => {
    const trimmed = leftInput.trim();
    if (!trimmed) {
      return { output: '', error: '' };
    }

    try {
      if (isJsonToYaml) {
        const parsed = JSON.parse(trimmed);
        const result = yaml.dump(parsed, {
          indent: 2,
          lineWidth: -1,
          noRefs: true,
          quotingType: '"',
          forceQuotes: false,
        });
        return { output: result, error: '' };
      }

      const parsed = yaml.load(trimmed);
      const result = JSON.stringify(parsed, null, 2);
      return { output: result, error: '' };
    } catch (e) {
      const msg = e instanceof Error ? e.message : t('unknownError', '알 수 없는 오류');
      return { output: '', error: msg };
    }
  }, [leftInput, isJsonToYaml]);

  const handleToggleDirection = useCallback(() => {
    setDirection((prev) => {
      const next = prev === 'json-to-yaml' ? 'yaml-to-json' : 'json-to-yaml';
      return next;
    });
    setLeftInput('');
    setCopied(false);
  }, []);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 접근 실패 시 무시
    }
  };

  const handleClear = () => {
    setLeftInput('');
    setCopied(false);
  };

  const handleSample = () => {
    setLeftInput(isJsonToYaml ? SAMPLE_JSON : SAMPLE_YAML);
    setCopied(false);
  };

  const handleUseOutput = () => {
    if (!output) return;
    setDirection((prev) => (prev === 'json-to-yaml' ? 'yaml-to-json' : 'json-to-yaml'));
    setLeftInput(output);
    setCopied(false);
  };

  const leftLabel = isJsonToYaml ? 'JSON' : 'YAML';
  const rightLabel = isJsonToYaml ? 'YAML' : 'JSON';
  const leftPlaceholder = isJsonToYaml
    ? t('jsonInputPlaceholder', 'JSON 데이터를 입력하세요...')
    : t('yamlInputPlaceholder', 'YAML 데이터를 입력하세요...');
  const rightPlaceholder = isJsonToYaml
    ? t('yamlOutputPlaceholder', '변환된 YAML이 여기에 표시됩니다.')
    : t('jsonOutputPlaceholder', '변환된 JSON이 여기에 표시됩니다.');
  const errorTitle = isJsonToYaml ? t('invalidJson', '유효하지 않은 JSON') : t('invalidYaml', '유효하지 않은 YAML');

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleToggleDirection}
          className="btn-primary flex items-center gap-2"
        >
          <span>{leftLabel}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M13.2 2.24a.75.75 0 0 0 .04 1.06l2.1 1.95H6.75a.75.75 0 0 0 0 1.5h8.59l-2.1 1.95a.75.75 0 1 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 0 0-1.06.04Zm-6.4 8a.75.75 0 0 0-1.06-.04l-3.5 3.25a.75.75 0 0 0 0 1.1l3.5 3.25a.75.75 0 1 0 1.02-1.1l-2.1-1.95h8.59a.75.75 0 0 0 0-1.5H4.66l2.1-1.95a.75.75 0 0 0 .04-1.06Z"
              clipRule="evenodd"
            />
          </svg>
          <span>{rightLabel}</span>
        </button>

        <button onClick={handleClear} className="btn-secondary">
          {t('clear', '초기화')}
        </button>
        <button
          onClick={handleSample}
          className="btn-secondary text-[var(--color-text-secondary)]"
        >
          {t('sampleData', '샘플 데이터')}
        </button>

        {output && (
          <button
            onClick={handleUseOutput}
            className="btn-secondary text-[var(--color-text-secondary)]"
          >
            {t('useOutputAsInput', '결과를 입력으로')}
          </button>
        )}
      </div>

      {/* Editor Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
            {leftLabel} {t('input', '입력')}
          </label>
          <textarea
            value={leftInput}
            onChange={(e) => setLeftInput(e.target.value)}
            placeholder={leftPlaceholder}
            className="input-area min-h-[400px] font-mono"
            spellCheck={false}
          />
          {/* Error below input */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <span className="text-red-500 text-sm shrink-0">✕</span>
              <div>
                <p className="text-sm font-medium text-red-500">{errorTitle}</p>
                <p className="text-xs text-red-400/80 mt-1 font-mono">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
              {rightLabel} {t('result', '결과')}
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="text-xs text-brand-500 hover:text-brand-400 transition-colors"
              >
                {copied ? t('copied', '복사됨') : t('copy', '복사하기')}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={rightPlaceholder}
            className="input-area min-h-[400px] font-mono bg-[var(--color-surface)]"
          />
        </div>
      </div>
    </div>
  );
}
