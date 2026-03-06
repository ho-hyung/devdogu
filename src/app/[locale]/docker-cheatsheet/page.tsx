import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { getToolDictionary } from '@/i18n/get-tool-dictionary';
import ToolLayout from '@/components/ToolLayout';
import DockerCheatsheetClient from '../../docker-cheatsheet/DockerCheatsheetClient';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('docker-cheatsheet', locale as Locale);
  return createMetadata({
    title: toolDict.metadata.title,
    description: toolDict.metadata.description,
    path: '/docker-cheatsheet',
    keywords: toolDict.metadata.keywords,
    locale: locale as Locale,
  });
}

export default async function LocaleDockerCheatsheetPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('docker-cheatsheet', locale as Locale);

  return (
    <ToolLayout toolId="docker-cheatsheet" faq={toolDict.faq} locale={locale as Locale}>
      <DockerCheatsheetClient dict={toolDict.ui as Record<string, string>} />
    </ToolLayout>
  );
}
