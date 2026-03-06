import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { getToolDictionary } from '@/i18n/get-tool-dictionary';
import ToolLayout from '@/components/ToolLayout';
import GitCheatsheetClient from '../../git-cheatsheet/GitCheatsheetClient';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('git-cheatsheet', locale as Locale);
  return createMetadata({
    title: toolDict.metadata.title,
    description: toolDict.metadata.description,
    path: '/git-cheatsheet',
    keywords: toolDict.metadata.keywords,
    locale: locale as Locale,
  });
}

export default async function LocaleGitCheatsheetPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('git-cheatsheet', locale as Locale);

  return (
    <ToolLayout toolId="git-cheatsheet" faq={toolDict.faq} locale={locale as Locale}>
      <GitCheatsheetClient dict={toolDict.ui as Record<string, string>} />
    </ToolLayout>
  );
}
