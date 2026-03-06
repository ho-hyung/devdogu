import { nonDefaultLocales, type Locale } from '@/i18n/config';
import LocaleUpdater from '@/components/LocaleUpdater';

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  return (
    <>
      <LocaleUpdater locale={locale as Locale} />
      {children}
    </>
  );
}
