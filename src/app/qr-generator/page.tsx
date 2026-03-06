import { createMetadata } from '@/lib/metadata';
import QrGeneratorClient from './QrGeneratorClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/qr-generator';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/qr-generator',
  keywords: toolDict.metadata.keywords,
});

export default function QrGeneratorPage() {
  return (
    <ToolLayout toolId="qr-generator" faq={toolDict.faq}>
      <QrGeneratorClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
