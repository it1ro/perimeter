import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Article, ArticleFrontmatter } from '@/types/article';

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');

let cachedArticles: Article[] | null = null;

function validateFrontmatter(data: Record<string, unknown>): ArticleFrontmatter | null {
  if (typeof data.title !== 'string' || !data.title) return null;
  if (typeof data.slug !== 'string' || !data.slug) return null;
  if (typeof data.date !== 'string' || !data.date) return null;
  if (typeof data.description !== 'string') return null;
  if (!Array.isArray(data.tags) || !data.tags.every((t) => typeof t === 'string')) return null;

  return {
    title: data.title,
    slug: data.slug,
    date: data.date,
    description: data.description,
    tags: data.tags as string[],
    ...(typeof data.cover === 'string' && { cover: data.cover }),
    ...(typeof data.readingTime === 'string' && { readingTime: data.readingTime }),
  };
}

export function getAllArticles(): Article[] {
  if (cachedArticles) {
    return cachedArticles;
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'));

  const articles: Article[] = [];

  for (const filename of files) {
    const filePath = path.join(ARTICLES_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const frontmatter = validateFrontmatter(data);
    if (!frontmatter) continue;
    articles.push({ frontmatter, content });
  }

  cachedArticles = articles.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  );

  return cachedArticles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getAllArticles();
  return articles.find((a) => a.frontmatter.slug === slug);
}

export function getAllTags(): string[] {
  const articles = getAllArticles();
  const tagSet = new Set<string>();
  articles.forEach((a) => a.frontmatter.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
