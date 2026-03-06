import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { getToolDictionary } from '@/i18n/get-tool-dictionary';
import ToolLayout from '@/components/ToolLayout';
import UrlEncoderClient from '../../url-encoder/UrlEncoderClient';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('url-encoder', locale as Locale);
  return createMetadata({
    title: toolDict.metadata.title,
    description: toolDict.metadata.description,
    path: '/url-encoder',
    keywords: toolDict.metadata.keywords,
    locale: locale as Locale,
  });
}

export default async function LocaleUrlEncoderPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('url-encoder', locale as Locale);

  return (
    <ToolLayout toolId="url-encoder" faq={toolDict.faq} locale={locale as Locale}>
      <UrlEncoderClient dict={toolDict.ui as Record<string, string>} />
    </ToolLayout>
  );
}
