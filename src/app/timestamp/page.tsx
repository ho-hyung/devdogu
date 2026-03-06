import { createMetadata } from '@/lib/metadata';
import TimestampClient from './TimestampClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/timestamp';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/timestamp',
  keywords: toolDict.metadata.keywords,
});

export default function TimestampPage() {
  return (
    <ToolLayout toolId="timestamp" faq={toolDict.faq}>
      <TimestampClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
