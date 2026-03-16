export interface ArticleFrontmatter {
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  cover?: string;
  readingTime?: string;
}

export interface Article {
  frontmatter: ArticleFrontmatter;
  content: string;
}
