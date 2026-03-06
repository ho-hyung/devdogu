import { createMetadata } from '@/lib/metadata';
import CronBuilderClient from './CronBuilderClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/cron-builder';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/cron-builder',
  keywords: toolDict.metadata.keywords,
});

export default function CronBuilderPage() {
  return (
    <ToolLayout toolId="cron-builder" faq={toolDict.faq}>
      <CronBuilderClient dict={toolDict.ui as unknown as Record<string, string>} />
    </ToolLayout>
  );
}
