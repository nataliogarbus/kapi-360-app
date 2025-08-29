import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), '_articulos_google_docs');

// Existing function to get all posts, sorted by date
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as { title: string; date: string; excerpt: string; category: string; tags: string[] }),
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
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// Function to get data for a single post
export function getPostData(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  const fullPath = path.join(postsDirectory, `${decodedSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    slug: decodedSlug,
    content: matterResult.content,
    ...(matterResult.data as { title: string; date: string; excerpt: string; category: string; tags: string[] }),
  };
}

// NEW: Function to get all unique categories for category pages
export function getAllCategories() {
  const allPosts = getSortedPostsData();
  const allCategories = allPosts.map(post => post.category).filter(Boolean); // filter(Boolean) removes any undefined/null
  const uniqueCategories = [...new Set(allCategories)];
  return uniqueCategories.map(category => ({
    params: {
      category: category,
    },
  }));
}

// NEW: Function to get all unique tags for tag pages
export function getAllTags() {
  const allPosts = getSortedPostsData();
  const allTags = allPosts.flatMap(post => post.tags || []);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags.map(tag => ({
    params: {
      tag: tag,
    },
  }));
}