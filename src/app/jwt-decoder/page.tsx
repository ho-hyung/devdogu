import { createMetadata } from '@/lib/metadata';
import JwtDecoderClient from './JwtDecoderClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/jwt-decoder';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/jwt-decoder',
  keywords: toolDict.metadata.keywords,
});

export default function JwtDecoderPage() {
  return (
    <ToolLayout toolId="jwt-decoder" faq={toolDict.faq}>
      <JwtDecoderClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
