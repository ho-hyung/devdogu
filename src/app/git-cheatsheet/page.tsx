import { createMetadata } from '@/lib/metadata';
import GitCheatsheetClient from './GitCheatsheetClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/git-cheatsheet';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/git-cheatsheet',
  keywords: toolDict.metadata.keywords,
});

export default function GitCheatsheetPage() {
  return (
    <ToolLayout toolId="git-cheatsheet" faq={toolDict.faq}>
      <GitCheatsheetClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
