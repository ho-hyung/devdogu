import { createMetadata } from '@/lib/metadata';
import MarkdownPreviewClient from './MarkdownPreviewClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: 'Markdown 미리보기',
  description:
    '온라인 Markdown 미리보기 — Markdown 문법을 실시간으로 렌더링합니다. README 작성, 문서 미리보기에 활용하세요.',
  path: '/markdown-preview',
  keywords: ['Markdown 미리보기', '마크다운 에디터', 'markdown preview', 'README', 'md 렌더링'],
});

const faq = [
  { q: 'Markdown이란 무엇인가요?', a: 'Markdown은 텍스트 기반의 경량 마크업 언어입니다. # 제목, **굵게**, *기울임*, [링크](URL) 등 간단한 문법으로 서식을 적용할 수 있으며, GitHub README, 블로그, 문서 작성 등에 널리 사용됩니다.' },
  { q: '어떤 Markdown 문법을 지원하나요?', a: '제목(#), 굵게(**), 기울임(*), 링크, 이미지, 코드 블록, 리스트, 인용구, 표, 수평선 등 표준 Markdown 문법을 모두 지원합니다.' },
];

export default function MarkdownPreviewPage() {
  return (
    <ToolLayout toolId="markdown-preview" faq={faq}>
      <MarkdownPreviewClient />
    </ToolLayout>
  );
}
