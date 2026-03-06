import { createMetadata } from '@/lib/metadata';
import RegexTesterClient from './RegexTesterClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/regex-tester';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/regex-tester',
  keywords: toolDict.metadata.keywords,
});

export default function RegexTesterPage() {
  return (
    <ToolLayout toolId="regex-tester" faq={toolDict.faq}>
      <RegexTesterClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
