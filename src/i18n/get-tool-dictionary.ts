import type { Locale } from './config';

type ToolDict = {
  metadata: { title: string; description: string; keywords: string[] };
  faq: { q: string; a: string }[];
  ui: Record<string, string | string[]>;
};

const toolModules: Record<string, Record<Locale, () => Promise<{ default: ToolDict }>>> = {
  'json-formatter': {
    ko: () => import('./tools/ko/json-formatter'),
    en: () => import('./tools/en/json-formatter'),
    ja: () => import('./tools/ja/json-formatter'),
    zh: () => import('./tools/zh/json-formatter'),
  },
  'base64': {
    ko: () => import('./tools/ko/base64'),
    en: () => import('./tools/en/base64'),
    ja: () => import('./tools/ja/base64'),
    zh: () => import('./tools/zh/base64'),
  },
  'url-encoder': {
    ko: () => import('./tools/ko/url-encoder'),
    en: () => import('./tools/en/url-encoder'),
    ja: () => import('./tools/ja/url-encoder'),
    zh: () => import('./tools/zh/url-encoder'),
  },
  'regex-tester': {
    ko: () => import('./tools/ko/regex-tester'),
    en: () => import('./tools/en/regex-tester'),
    ja: () => import('./tools/ja/regex-tester'),
    zh: () => import('./tools/zh/regex-tester'),
  },
  'jwt-decoder': {
    ko: () => import('./tools/ko/jwt-decoder'),
    en: () => import('./tools/en/jwt-decoder'),
    ja: () => import('./tools/ja/jwt-decoder'),
    zh: () => import('./tools/zh/jwt-decoder'),
  },
  'timestamp': {
    ko: () => import('./tools/ko/timestamp'),
    en: () => import('./tools/en/timestamp'),
    ja: () => import('./tools/ja/timestamp'),
    zh: () => import('./tools/zh/timestamp'),
  },
  'id-generator': {
    ko: () => import('./tools/ko/id-generator'),
    en: () => import('./tools/en/id-generator'),
    ja: () => import('./tools/ja/id-generator'),
    zh: () => import('./tools/zh/id-generator'),
  },
  'hash-generator': {
    ko: () => import('./tools/ko/hash-generator'),
    en: () => import('./tools/en/hash-generator'),
    ja: () => import('./tools/ja/hash-generator'),
    zh: () => import('./tools/zh/hash-generator'),
  },
  'diff-checker': {
    ko: () => import('./tools/ko/diff-checker'),
    en: () => import('./tools/en/diff-checker'),
    ja: () => import('./tools/ja/diff-checker'),
    zh: () => import('./tools/zh/diff-checker'),
  },
  'color-converter': {
    ko: () => import('./tools/ko/color-converter'),
    en: () => import('./tools/en/color-converter'),
    ja: () => import('./tools/ja/color-converter'),
    zh: () => import('./tools/zh/color-converter'),
  },
  'markdown-preview': {
    ko: () => import('./tools/ko/markdown-preview'),
    en: () => import('./tools/en/markdown-preview'),
    ja: () => import('./tools/ja/markdown-preview'),
    zh: () => import('./tools/zh/markdown-preview'),
  },
  'qr-generator': {
    ko: () => import('./tools/ko/qr-generator'),
    en: () => import('./tools/en/qr-generator'),
    ja: () => import('./tools/ja/qr-generator'),
    zh: () => import('./tools/zh/qr-generator'),
  },
  'sql-formatter': {
    ko: () => import('./tools/ko/sql-formatter'),
    en: () => import('./tools/en/sql-formatter'),
    ja: () => import('./tools/ja/sql-formatter'),
    zh: () => import('./tools/zh/sql-formatter'),
  },
  'git-cheatsheet': {
    ko: () => import('./tools/ko/git-cheatsheet'),
    en: () => import('./tools/en/git-cheatsheet'),
    ja: () => import('./tools/ja/git-cheatsheet'),
    zh: () => import('./tools/zh/git-cheatsheet'),
  },
  'docker-cheatsheet': {
    ko: () => import('./tools/ko/docker-cheatsheet'),
    en: () => import('./tools/en/docker-cheatsheet'),
    ja: () => import('./tools/ja/docker-cheatsheet'),
    zh: () => import('./tools/zh/docker-cheatsheet'),
  },
  'http-status': {
    ko: () => import('./tools/ko/http-status'),
    en: () => import('./tools/en/http-status'),
    ja: () => import('./tools/ja/http-status'),
    zh: () => import('./tools/zh/http-status'),
  },
  'cron-cheatsheet': {
    ko: () => import('./tools/ko/cron-cheatsheet'),
    en: () => import('./tools/en/cron-cheatsheet'),
    ja: () => import('./tools/ja/cron-cheatsheet'),
    zh: () => import('./tools/zh/cron-cheatsheet'),
  },
  'linux-cheatsheet': {
    ko: () => import('./tools/ko/linux-cheatsheet'),
    en: () => import('./tools/en/linux-cheatsheet'),
    ja: () => import('./tools/ja/linux-cheatsheet'),
    zh: () => import('./tools/zh/linux-cheatsheet'),
  },
  'regex-cheatsheet': {
    ko: () => import('./tools/ko/regex-cheatsheet'),
    en: () => import('./tools/en/regex-cheatsheet'),
    ja: () => import('./tools/ja/regex-cheatsheet'),
    zh: () => import('./tools/zh/regex-cheatsheet'),
  },
  'json-yaml': {
    ko: () => import('./tools/ko/json-yaml'),
    en: () => import('./tools/en/json-yaml'),
    ja: () => import('./tools/ja/json-yaml'),
    zh: () => import('./tools/zh/json-yaml'),
  },
  'text-case': {
    ko: () => import('./tools/ko/text-case'),
    en: () => import('./tools/en/text-case'),
    ja: () => import('./tools/ja/text-case'),
    zh: () => import('./tools/zh/text-case'),
  },
  'lorem-ipsum': {
    ko: () => import('./tools/ko/lorem-ipsum'),
    en: () => import('./tools/en/lorem-ipsum'),
    ja: () => import('./tools/ja/lorem-ipsum'),
    zh: () => import('./tools/zh/lorem-ipsum'),
  },
  'password-generator': {
    ko: () => import('./tools/ko/password-generator'),
    en: () => import('./tools/en/password-generator'),
    ja: () => import('./tools/ja/password-generator'),
    zh: () => import('./tools/zh/password-generator'),
  },
  'cron-builder': {
    ko: () => import('./tools/ko/cron-builder'),
    en: () => import('./tools/en/cron-builder'),
    ja: () => import('./tools/ja/cron-builder'),
    zh: () => import('./tools/zh/cron-builder'),
  },
};

export async function getToolDictionary(toolId: string, locale: Locale): Promise<ToolDict> {
  const mod = await toolModules[toolId][locale]();
  return mod.default;
}

export type { ToolDict };
