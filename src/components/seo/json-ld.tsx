import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { brand, htmlLangMap, localeUrl, siteUrl } from '@/lib/seo/site';

type JsonLdProps = {
  locale: Locale;
};

export async function JsonLd({ locale }: JsonLdProps) {
  const t = await getTranslations({ locale, namespace: 'seo' });

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: brand.name,
    legalName: locale === 'ko' ? brand.legalName : `AERIS by ${brand.operatorEn}`,
    alternateName: locale === 'ko' ? `AERIS by ${brand.operatorKo}` : `AERIS by ${brand.operatorEn}`,
    slogan: brand.slogan,
    url: siteUrl,
    logo: `${siteUrl}${brand.logoPath}`,
    description: t('description'),
    parentOrganization: {
      '@type': 'Organization',
      name: locale === 'ko' ? brand.operatorKo : brand.operatorEn,
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: localeUrl(locale),
    name: brand.name,
    description: t('description'),
    inLanguage: htmlLangMap[locale],
    publisher: { '@id': `${siteUrl}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
