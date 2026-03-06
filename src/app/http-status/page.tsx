import { createMetadata } from '@/lib/metadata';
import HttpStatusClient from './HttpStatusClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/http-status';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/http-status',
  keywords: toolDict.metadata.keywords,
});

export default function HttpStatusPage() {
  return (
    <ToolLayout toolId="http-status" faq={toolDict.faq}>
      <HttpStatusClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
