import type { MetadataRoute } from 'next';
import { isProductionDeployment, siteUrl } from '@/lib/seo/site';

export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dev', '/en/dev'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
