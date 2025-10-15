import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostData } from '@/app/types';

const postsDirectory = path.join(process.cwd(), '_articulos_google_docs');

// Helper function to create a URL-friendly slug from a title
function slugify(text: string): string {
  if (!text) return '';
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}


// Function to get all posts, sorted by date
export function getSortedPostsData(): (Post & { fileName: string })[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const title = matterResult.data.title || '';
    const slug = slugify(title);

    return {
      slug,
      fileName: fileName.replace(/\.md$/, ''),
      title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt,
      category: matterResult.data.category,
      tags: matterResult.data.tags,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Function to get all slugs for individual post pages
export function getAllPostIds() {
  const posts = getSortedPostsData();
  return posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });
}

// Function to get data for a single post
export function getPostData(slug: string): PostData | null {
  const allPosts = getSortedPostsData();
  const post = allPosts.find(p => p.slug === slug);

  if (!post) {
    return null;
  }

  const fullPath = path.join(postsDirectory, `${post.fileName}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    slug: post.slug,
    content: matterResult.content,
    title: matterResult.data.title,
    date: matterResult.data.date,
    excerpt: matterResult.data.excerpt,
    category: matterResult.data.category,
    tags: matterResult.data.tags,
  };
}

// Function to get all unique categories for category pages
export function getAllCategories() {
  const allPosts = getSortedPostsData();
  const allCategories = allPosts.map(post => post.category).filter(Boolean);
  const uniqueCategories = [...new Set(allCategories)];
  return uniqueCategories.map(category => ({
    params: {
      // We should also slugify categories for cleaner URLs
      category: slugify(category),
    },
  }));
}

// Function to get all unique tags for tag pages
export function getAllTags() {
  const allPosts = getSortedPostsData();
  const allTags = allPosts.flatMap(post => post.tags || []);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags.map(tag => ({
    params: {
      // And slugify tags as well
      tag: slugify(tag),
    },
  }));
}

// Function to get a simple list of unique tags for the UI
export function getUniqueTags(): string[] {
  const allPosts = getSortedPostsData();
  const allTags = allPosts.flatMap(post => post.tags || []);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags.sort();
}