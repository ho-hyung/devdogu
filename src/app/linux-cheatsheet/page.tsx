import { createMetadata } from '@/lib/metadata';
import LinuxCheatsheetClient from './LinuxCheatsheetClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/linux-cheatsheet';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/linux-cheatsheet',
  keywords: toolDict.metadata.keywords,
});

export default function LinuxCheatsheetPage() {
  return (
    <ToolLayout toolId="linux-cheatsheet" faq={toolDict.faq}>
      <LinuxCheatsheetClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
