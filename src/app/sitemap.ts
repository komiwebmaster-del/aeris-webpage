import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { htmlLangMap, localeUrl } from '@/lib/seo/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [htmlLangMap[l], localeUrl(l)]),
  );

  return routing.locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: locale === routing.defaultLocale ? 1.0 : 0.8,
    alternates: { languages },
  }));
}
