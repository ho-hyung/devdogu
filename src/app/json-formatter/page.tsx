import { createMetadata } from '@/lib/metadata';
import JsonFormatterClient from './JsonFormatterClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/json-formatter';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/json-formatter',
  keywords: toolDict.metadata.keywords,
});

export default function JsonFormatterPage() {
  return (
    <ToolLayout toolId="json-formatter" faq={toolDict.faq}>
      <JsonFormatterClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
