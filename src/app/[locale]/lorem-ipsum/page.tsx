import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { getToolDictionary } from '@/i18n/get-tool-dictionary';
import ToolLayout from '@/components/ToolLayout';
import LoremIpsumClient from '../../lorem-ipsum/LoremIpsumClient';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('lorem-ipsum', locale as Locale);
  return createMetadata({
    title: toolDict.metadata.title,
    description: toolDict.metadata.description,
    path: '/lorem-ipsum',
    keywords: toolDict.metadata.keywords,
    locale: locale as Locale,
  });
}

export default async function LocaleLoremIpsumPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('lorem-ipsum', locale as Locale);

  return (
    <ToolLayout toolId="lorem-ipsum" faq={toolDict.faq} locale={locale as Locale}>
      <LoremIpsumClient dict={toolDict.ui as Record<string, string>} />
    </ToolLayout>
  );
}
