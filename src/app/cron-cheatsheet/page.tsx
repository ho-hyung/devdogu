import { createMetadata } from '@/lib/metadata';
import CronCheatsheetClient from './CronCheatsheetClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/cron-cheatsheet';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/cron-cheatsheet',
  keywords: toolDict.metadata.keywords,
});

export default function CronCheatsheetPage() {
  return (
    <ToolLayout toolId="cron-cheatsheet" faq={toolDict.faq}>
      <CronCheatsheetClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
