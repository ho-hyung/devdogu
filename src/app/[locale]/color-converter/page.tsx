import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { getToolDictionary } from '@/i18n/get-tool-dictionary';
import ToolLayout from '@/components/ToolLayout';
import ColorConverterClient from '../../color-converter/ColorConverterClient';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('color-converter', locale as Locale);
  return createMetadata({
    title: toolDict.metadata.title,
    description: toolDict.metadata.description,
    path: '/color-converter',
    keywords: toolDict.metadata.keywords,
    locale: locale as Locale,
  });
}

export default async function LocaleColorConverterPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('color-converter', locale as Locale);

  return (
    <ToolLayout toolId="color-converter" faq={toolDict.faq} locale={locale as Locale}>
      <ColorConverterClient dict={toolDict.ui as Record<string, string>} />
    </ToolLayout>
  );
}
