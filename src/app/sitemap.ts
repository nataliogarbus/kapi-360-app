import { MetadataRoute } from 'next';
import { getSortedPostsData, getAllCategories, getAllTags } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kapi-360-app.vercel.app';

  // URLs estáticas
  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/diagnostico`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];

  // URLs de los posts
  const posts = getSortedPostsData();
  const postUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as 'yearly',
    priority: 0.7,
  }));

  // URLs de las categorías
  const categories = getAllCategories();
  const categoryUrls = categories.map(cat => ({
    url: `${baseUrl}/blog/category/${cat.params.category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.6,
  }));

  // URLs de los tags
  const tags = getAllTags();
  const tagUrls = tags.map(tag => ({
    url: `${baseUrl}/blog/tag/${tag.params.tag}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.6,
  }));

  return [
    ...staticUrls,
    ...postUrls,
    ...categoryUrls,
    ...tagUrls,
  ];
}
