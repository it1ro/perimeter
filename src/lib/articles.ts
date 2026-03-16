import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Article, ArticleFrontmatter } from '@/types/article';

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');

export function getAllArticles(): Article[] {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'));

  const articles = files.map((filename) => {
    const filePath = path.join(ARTICLES_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    return {
      frontmatter: data as ArticleFrontmatter,
      content,
    };
  });

  return articles.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  );
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
