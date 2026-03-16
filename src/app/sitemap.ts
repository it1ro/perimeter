import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { getAllTests } from '@/lib/tests';
import { SITE_URL } from '@/lib/constants';

const BASE_URL = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/articles/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/tests/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/infographics/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contacts/`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/privacy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const articlePages: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${BASE_URL}/articles/${article.frontmatter.slug}/`,
    lastModified: article.frontmatter.date,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const testPages: MetadataRoute.Sitemap = getAllTests().map((test) => ({
    url: `${BASE_URL}/tests/${test.id}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages, ...testPages];
}
