import { createMetadata } from '@/lib/metadata';
import UrlEncoderClient from './UrlEncoderClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/url-encoder';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/url-encoder',
  keywords: toolDict.metadata.keywords,
});

export default function UrlEncoderPage() {
  return (
    <ToolLayout toolId="url-encoder" faq={toolDict.faq}>
      <UrlEncoderClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
