import { routing, type Locale } from '@/i18n/routing';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://aeris.example.com';

export const isProductionDeployment =
  process.env.VERCEL_ENV === 'production' ||
  (process.env.VERCEL_ENV === undefined && process.env.NODE_ENV === 'production');

export const brand = {
  name: 'AERIS',
  legalName: 'AERIS by 코리잡',
  operatorKo: '코리잡',
  operatorEn: 'Korijob',
  slogan: 'Air, Engineered.',
  logoPath: '/images/logo/aeris-logo-navy.png',
} as const;

export const localeMap: Record<Locale, string> = {
  ko: 'ko_KR',
  en: 'en_US',
};

export const htmlLangMap: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
};

export function localePath(locale: Locale, path = '/'): string {
  if (locale === routing.defaultLocale) return path;
  const trimmed = path === '/' ? '' : path;
  return `/${locale}${trimmed}`;
}

export function localeUrl(locale: Locale, path = '/'): string {
  return `${siteUrl}${localePath(locale, path)}`;
}
