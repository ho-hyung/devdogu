'use client';

import { useState, useMemo } from 'react';
import { marked } from 'marked';

const SAMPLE = `# Markdown 미리보기

## 제목

### 세 번째 수준 제목

**굵은 텍스트**, *기울임 텍스트*, ~~취소선~~

## 목록

- 항목 1
- 항목 2
  - 하위 항목

1. 순서 있는 목록
2. 두 번째 항목

## 코드

인라인 \`코드\`와 코드 블록:

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## 링크 & 이미지

[DevDogu](https://devdogu.vercel.app)

## 인용구

> 이것은 인용구입니다.
> 여러 줄로 작성할 수 있습니다.

## 표

| 이름 | 설명 |
|------|------|
| HEX | 16진수 색상 |
| RGB | 빨강/초록/파랑 |

---

수평선 위의 텍스트`;

interface MarkdownPreviewClientProps {
  dict?: Record<string, string>;
}

export default function MarkdownPreviewClient({ dict }: MarkdownPreviewClientProps) {
  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;
  const [input, setInput] = useState(SAMPLE);

  const html = useMemo(() => {
    return marked.parse(input, { async: false }) as string;
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">{t('markdownInput', 'Markdown 입력')}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="input-area min-h-[500px]" spellCheck={false} placeholder={t('markdownPlaceholder', 'Markdown을 입력하세요...')} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">{t('preview', '미리보기')}</label>
          <div className="markdown-body p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg min-h-[500px] overflow-y-auto custom-scrollbar" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
}
