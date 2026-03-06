import { createMetadata } from '@/lib/metadata';
import SqlFormatterClient from './SqlFormatterClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/sql-formatter';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/sql-formatter',
  keywords: toolDict.metadata.keywords,
});

export default function SqlFormatterPage() {
  return (
    <ToolLayout toolId="sql-formatter" faq={toolDict.faq}>
      <SqlFormatterClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
