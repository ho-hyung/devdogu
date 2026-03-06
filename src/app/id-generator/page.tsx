import { createMetadata } from '@/lib/metadata';
import IdGeneratorClient from './IdGeneratorClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/id-generator';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/id-generator',
  keywords: toolDict.metadata.keywords,
});

export default function IdGeneratorPage() {
  return (
    <ToolLayout toolId="id-generator" faq={toolDict.faq}>
      <IdGeneratorClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
