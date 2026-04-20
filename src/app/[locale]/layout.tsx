import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/json-ld';
import { routing, type Locale } from '@/i18n/routing';
import {
  htmlLangMap,
  isProductionDeployment,
  localeMap,
  localePath,
  localeUrl,
  siteUrl,
} from '@/lib/seo/site';
import '@/styles/globals.css';

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: 'seo' });

  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [htmlLangMap[l], localeUrl(l)]),
  );
  languages['x-default'] = localeUrl(routing.defaultLocale);

  const robots = isProductionDeployment
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const },
      }
    : { index: false, follow: false };

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t('title'), template: `%s — ${t('titleBrand')}` },
    description: t('description'),
    keywords: t('keywords')
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean),
    applicationName: 'AERIS',
    authors: [{ name: 'AERIS by 코리잡' }],
    creator: 'AERIS',
    publisher: 'AERIS by 코리잡',
    alternates: {
      canonical: localePath(typedLocale),
      languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'AERIS',
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: localeUrl(typedLocale),
      locale: localeMap[typedLocale],
      alternateLocale: routing.locales
        .filter((l) => l !== typedLocale)
        .map((l) => localeMap[l]),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
    robots,
    icons: {
      icon: [{ url: '/favicon.ico' }],
      shortcut: ['/favicon.ico'],
    },
    category: 'technology',
    formatDetection: { email: false, telephone: false, address: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const messages = await getMessages();

  return (
    <html lang={htmlLangMap[typedLocale]} data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body>
        <NextIntlClientProvider locale={typedLocale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <JsonLd locale={typedLocale} />
      </body>
    </html>
  );
}
