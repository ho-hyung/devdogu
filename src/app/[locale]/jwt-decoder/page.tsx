import { nonDefaultLocales, type Locale } from '@/i18n/config';
import { createMetadata } from '@/lib/metadata';
import { getToolDictionary } from '@/i18n/get-tool-dictionary';
import ToolLayout from '@/components/ToolLayout';
import JwtDecoderClient from '../../jwt-decoder/JwtDecoderClient';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('jwt-decoder', locale as Locale);
  return createMetadata({
    title: toolDict.metadata.title,
    description: toolDict.metadata.description,
    path: '/jwt-decoder',
    keywords: toolDict.metadata.keywords,
    locale: locale as Locale,
  });
}

export default async function LocaleJwtDecoderPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const toolDict = await getToolDictionary('jwt-decoder', locale as Locale);

  return (
    <ToolLayout toolId="jwt-decoder" faq={toolDict.faq} locale={locale as Locale}>
      <JwtDecoderClient dict={toolDict.ui as Record<string, string>} />
    </ToolLayout>
  );
}
