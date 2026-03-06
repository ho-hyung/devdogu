import { createMetadata } from '@/lib/metadata';
import DiffCheckerClient from './DiffCheckerClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/diff-checker';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/diff-checker',
  keywords: toolDict.metadata.keywords,
});

export default function DiffCheckerPage() {
  return (
    <ToolLayout toolId="diff-checker" faq={toolDict.faq}>
      <DiffCheckerClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
