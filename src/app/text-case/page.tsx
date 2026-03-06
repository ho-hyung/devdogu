import { createMetadata } from '@/lib/metadata';
import TextCaseClient from './TextCaseClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/text-case';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/text-case',
  keywords: toolDict.metadata.keywords,
});

export default function TextCasePage() {
  return (
    <ToolLayout toolId="text-case" faq={toolDict.faq}>
      <TextCaseClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
