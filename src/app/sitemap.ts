import type { MetadataRoute } from 'next';

import { siteConfig } from '@/shared/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/ser`,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];
}
