import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { getToolDictionary } from '@/i18n/get-tool-dictionary';
import ToolLayout from '@/components/ToolLayout';
import HashGeneratorClient from '../../hash-generator/HashGeneratorClient';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('hash-generator', locale as Locale);
  return createMetadata({
    title: toolDict.metadata.title,
    description: toolDict.metadata.description,
    path: '/hash-generator',
    keywords: toolDict.metadata.keywords,
    locale: locale as Locale,
  });
}

export default async function LocaleHashGeneratorPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('hash-generator', locale as Locale);

  return (
    <ToolLayout toolId="hash-generator" faq={toolDict.faq} locale={locale as Locale}>
      <HashGeneratorClient dict={toolDict.ui as Record<string, string>} />
    </ToolLayout>
  );
}
