'use client';

import { useState, useEffect } from 'react';
import { tagPillarMapping } from '@/lib/tag-mapping';
import BlogList from '@/components/BlogList';
import { useLanguage } from '@/context/LanguageContext';
import { Post } from '@/app/types';

export default function BlogHome() {
  const { language } = useLanguage();
  const [allPostsData, setAllPostsData] = useState<(Post & { fileName: string })[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts?lang=${language}&all=true`); // We might need to adjust API to return all posts if needed, or simple GET returns featured. 
        // Wait, route.ts returns featuredPosts (slice 0,3). I need another endpoint or param for ALL posts.
        // Let's assume for now I will modify route.ts to support 'all' param or check if getSortedPostsData is exposed via API.
        // Actually, looking at route.ts, it returns slices. I should update route.ts to return all posts if requested.
        const response = await fetch(`/api/posts?lang=${language}&limit=all`);
        const data = await response.json();
        setAllPostsData(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    fetchPosts();
  }, [language]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 bg-[#1a1a1a] text-white">
      <div className="w-full max-w-4xl mx-auto py-12 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-white">
          {language === 'es' ? 'Blog Estratégico de Kapi' : 'Kapi Strategic Blog'}
        </h1>
        <BlogList allPostsData={allPostsData} tagMapping={tagPillarMapping} language={language} />
      </div>
    </main>
  );
}