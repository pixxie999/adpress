import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags?: string[];
  thumbnail?: string;
  readingTime?: number;
  featured?: boolean;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

export function getPostSlugs(category: string) {
  const categoryPath = path.join(contentDirectory, category);
  if (!fs.existsSync(categoryPath)) return [];
  return fs.readdirSync(categoryPath).filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
}

export function getPostBySlug(slug: string, category: string): Post | null {
  const realSlug = slug.replace(/\.mdx$/, '').replace(/\.md$/, '');
  
  let fullPath = path.join(contentDirectory, category, `${realSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(contentDirectory, category, `${realSlug}.md`);
    if (!fs.existsSync(fullPath)) return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    meta: {
      slug: realSlug,
      title: data.title || realSlug,
      description: data.description || '',
      date: data.date || '',
      category: data.category || category,
      tags: data.tags || [],
      thumbnail: data.thumbnail,
      readingTime: data.readingTime || 5,
      featured: typeof data.featured === 'boolean' ? data.featured : false,
    },
    content,
  };
}

export function getAllPosts(category: string): PostMeta[] {
  const slugs = getPostSlugs(category);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, category))
    .filter((post): post is Post => post !== null)
    .map((post) => post.meta)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
