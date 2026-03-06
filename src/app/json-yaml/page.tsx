import { createMetadata } from '@/lib/metadata';
import JsonYamlClient from './JsonYamlClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/json-yaml';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/json-yaml',
  keywords: toolDict.metadata.keywords,
});

export default function JsonYamlPage() {
  return (
    <ToolLayout toolId="json-yaml" faq={toolDict.faq}>
      <JsonYamlClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
