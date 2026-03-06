import { createMetadata } from '@/lib/metadata';
import PasswordGeneratorClient from './PasswordGeneratorClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/password-generator';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/password-generator',
  keywords: toolDict.metadata.keywords,
});

export default function PasswordGeneratorPage() {
  return (
    <ToolLayout toolId="password-generator" faq={toolDict.faq}>
      <PasswordGeneratorClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
