import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { getToolDictionary } from '@/i18n/get-tool-dictionary';
import ToolLayout from '@/components/ToolLayout';
import MarkdownPreviewClient from '../../markdown-preview/MarkdownPreviewClient';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('markdown-preview', locale as Locale);
  return createMetadata({
    title: toolDict.metadata.title,
    description: toolDict.metadata.description,
    path: '/markdown-preview',
    keywords: toolDict.metadata.keywords,
    locale: locale as Locale,
  });
}

export default async function LocaleMarkdownPreviewPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('markdown-preview', locale as Locale);

  return (
    <ToolLayout toolId="markdown-preview" faq={toolDict.faq} locale={locale as Locale}>
      <MarkdownPreviewClient dict={toolDict.ui as Record<string, string>} />
    </ToolLayout>
  );
}
