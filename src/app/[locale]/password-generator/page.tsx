import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { getToolDictionary } from '@/i18n/get-tool-dictionary';
import ToolLayout from '@/components/ToolLayout';
import PasswordGeneratorClient from '../../password-generator/PasswordGeneratorClient';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('password-generator', locale as Locale);
  return createMetadata({
    title: toolDict.metadata.title,
    description: toolDict.metadata.description,
    path: '/password-generator',
    keywords: toolDict.metadata.keywords,
    locale: locale as Locale,
  });
}

export default async function LocalePasswordGeneratorPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('password-generator', locale as Locale);

  return (
    <ToolLayout toolId="password-generator" faq={toolDict.faq} locale={locale as Locale}>
      <PasswordGeneratorClient dict={toolDict.ui as Record<string, string>} />
    </ToolLayout>
  );
}
