import { createMetadata } from '@/lib/metadata';
import RegexCheatsheetClient from './RegexCheatsheetClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/regex-cheatsheet';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/regex-cheatsheet',
  keywords: toolDict.metadata.keywords,
});

export default function RegexCheatsheetPage() {
  return (
    <ToolLayout toolId="regex-cheatsheet" faq={toolDict.faq}>
      <RegexCheatsheetClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
