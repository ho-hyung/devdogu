import { createMetadata } from '@/lib/metadata';
import MarkdownPreviewClient from './MarkdownPreviewClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/markdown-preview';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/markdown-preview',
  keywords: toolDict.metadata.keywords,
});

export default function MarkdownPreviewPage() {
  return (
    <ToolLayout toolId="markdown-preview" faq={toolDict.faq}>
      <MarkdownPreviewClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
