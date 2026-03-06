import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { getToolDictionary } from '@/i18n/get-tool-dictionary';
import ToolLayout from '@/components/ToolLayout';
import CronCheatsheetClient from '../../cron-cheatsheet/CronCheatsheetClient';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('cron-cheatsheet', locale as Locale);
  return createMetadata({
    title: toolDict.metadata.title,
    description: toolDict.metadata.description,
    path: '/cron-cheatsheet',
    keywords: toolDict.metadata.keywords,
    locale: locale as Locale,
  });
}

export default async function LocaleCronCheatsheetPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('cron-cheatsheet', locale as Locale);

  return (
    <ToolLayout toolId="cron-cheatsheet" faq={toolDict.faq} locale={locale as Locale}>
      <CronCheatsheetClient dict={toolDict.ui as Record<string, string>} />
    </ToolLayout>
  );
}
