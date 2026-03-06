import { createMetadata } from '@/lib/metadata';
import ColorConverterClient from './ColorConverterClient';
import ToolLayout from '@/components/ToolLayout';
import toolDict from '@/i18n/tools/ko/color-converter';

export const metadata = createMetadata({
  title: toolDict.metadata.title,
  description: toolDict.metadata.description,
  path: '/color-converter',
  keywords: toolDict.metadata.keywords,
});

export default function ColorConverterPage() {
  return (
    <ToolLayout toolId="color-converter" faq={toolDict.faq}>
      <ColorConverterClient dict={toolDict.ui} />
    </ToolLayout>
  );
}
