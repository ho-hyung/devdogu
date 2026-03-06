import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { getToolDictionary } from '@/i18n/get-tool-dictionary';
import ToolLayout from '@/components/ToolLayout';
import JsonFormatterClient from '../../json-formatter/JsonFormatterClient';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('json-formatter', locale as Locale);
  return createMetadata({
    title: toolDict.metadata.title,
    description: toolDict.metadata.description,
    path: '/json-formatter',
    keywords: toolDict.metadata.keywords,
    locale: locale as Locale,
  });
}

export default async function LocaleJsonFormatterPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('json-formatter', locale as Locale);

  return (
    <ToolLayout toolId="json-formatter" faq={toolDict.faq} locale={locale as Locale}>
      <JsonFormatterClient dict={toolDict.ui as Record<string, string>} />
    </ToolLayout>
  );
}
