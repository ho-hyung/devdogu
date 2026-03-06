import { createMetadata } from '@/lib/metadata';
import HashGeneratorClient from './HashGeneratorClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/hash-generator';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/hash-generator',
  keywords: toolDict.metadata.keywords,
});

export default function HashGeneratorPage() {
  return (
    <ToolLayout toolId="hash-generator" faq={toolDict.faq}>
      <HashGeneratorClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
