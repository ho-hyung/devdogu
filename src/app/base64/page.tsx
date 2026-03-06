import { createMetadata } from '@/lib/metadata';
import Base64Client from './Base64Client';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/base64';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/base64',
  keywords: toolDict.metadata.keywords,
});

export default function Base64Page() {
  return (
    <ToolLayout toolId="base64" faq={toolDict.faq}>
      <Base64Client dict={toolDict.ui} />
    </ToolLayout>
  );
}
