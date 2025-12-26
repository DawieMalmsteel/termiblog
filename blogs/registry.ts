import { BlogPost } from '../types';

// Import all markdown files using Vite's glob import
const markdownFiles = import.meta.glob('./**/*.md', { 
  query: '?raw', 
  import: 'default',
  eager: true 
}) as Record<string, string>;

// Simple frontmatter parser (no dependencies)
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatter, markdown] = match;
  const data: Record<string, any> = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      data[key.trim()] = value;
    }
  });
  
  return { data, content: markdown };
}

export const BLOG_REGISTRY: BlogPost[] = Object.entries(markdownFiles).map(([filepath, content]) => {
  // Parse frontmatter
  const { data, content: markdownContent } = parseFrontmatter(content);
  
  // Extract filename as ID
  const filename = filepath.split('/').pop()?.replace('.md', '') || 'untitled';
  const id = data.id || filename;
  
  return {
    id,
    title: data.title || 'Untitled Post',
    excerpt: data.excerpt || '',
    content: markdownContent,
    date: data.date || new Date().toISOString(),
    categories: typeof data.categories === 'string'
      ? data.categories.split(',').map((c: string) => c.trim())
      : [],
    tags: typeof data.tags === 'string'
      ? data.tags.split(',').map((t: string) => t.trim())
      : []
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

