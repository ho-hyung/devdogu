import { createMetadata } from '@/lib/metadata';
import LoremIpsumClient from './LoremIpsumClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/lorem-ipsum';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/lorem-ipsum',
  keywords: toolDict.metadata.keywords,
});

export default function LoremIpsumPage() {
  return (
    <ToolLayout toolId="lorem-ipsum" faq={toolDict.faq}>
      <LoremIpsumClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
