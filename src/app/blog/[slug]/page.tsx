'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import Link from 'next/link';
import RecommendedPosts from '@/components/RecommendedPosts';
import GlossaryTooltip from '@/components/GlossaryTooltip';
import { glossaryTerms } from '@/lib/glossary-terms';
import { useLanguage } from '@/context/LanguageContext';
import { Post as PostType } from '@/app/types';

export default function Post({ params }: { params: { slug: string } }) {
  const { language } = useLanguage();
  const [postData, setPostData] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = 'https://kapi-360-app.vercel.app';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch current post
        const postRes = await fetch(`/api/posts/${params.slug}?lang=${language}`);
        if (!postRes.ok) throw new Error('Failed to fetch post');
        const post = await postRes.json();
        setPostData(post);

        // Fetch all posts for recommendations
        const allPostsRes = await fetch(`/api/posts?lang=${language}&limit=all`);
        const allPosts = await allPostsRes.json();

        // Calculate related posts
        const related = allPosts
          .filter((p: any) => p.slug !== post.slug)
          .map((p: any) => {
            let score = 0;
            if (p.tags && post.tags) {
              score += p.tags.filter((tag: string) => post.tags.includes(tag)).length * 2;
            }
            if (p.category === post.category) {
              score += 1;
            }
            return { ...p, score };
          })
          .filter((p: any) => p.score > 0)
          .sort((a: any, b: any) => b.score - a.score)
          .slice(0, 3);

        setRelatedPosts(related);

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.slug, language]);

  if (isLoading) return <div className="text-white text-center py-24">Cargando...</div>;
  if (!postData) return <div className="text-white text-center py-24">Articulo no encontrado</div>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${postData.slug}`,
    },
    headline: postData.title,
    description: postData.excerpt,
    datePublished: new Date(postData.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Kapi',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kapi',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo-kapi-verde.svg`,
      },
    },
  };

  const renderers: Components = {
    p: ({ children }) => {
      return (
        <p className="mb-6 leading-relaxed text-gray-300">
          {React.Children.map(children, (child) => {
            if (typeof child === 'string') {
              const keys = Object.keys(glossaryTerms).sort((a, b) => b.length - a.length);
              const regex = new RegExp(`\\b(${keys.join('|')})\\b`, 'gi');
              const parts = child.split(regex);
              return parts.map((part, i) => {
                const matchedKey = keys.find(k => k.toLowerCase() === part.toLowerCase());
                if (matchedKey) {
                  return (
                    <GlossaryTooltip
                      key={i}
                      term={matchedKey}
                      definition={glossaryTerms[matchedKey]}
                    >
                      {part}
                    </GlossaryTooltip>
                  );
                }
                return part;
              });
            }
            return child;
          })}
        </p>
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 bg-[#1a1a1a] text-white">
      <article className="w-full max-w-3xl mx-auto py-12 sm:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="mb-8 text-center">
          {postData.category && (
            <Link href={`/blog/category/${encodeURIComponent(postData.category)}`}>
              <p className="text-base text-cyan-400 font-semibold tracking-wide uppercase hover:text-cyan-300 transition-colors">{postData.category}</p>
            </Link>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 text-white">{postData.title}</h1>
          {postData.date && (
            <p className="mt-4 text-lg text-gray-400">{new Date(postData.date).toLocaleDateString(language === 'es' ? 'es-AR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          )}
        </div>

        <div className="prose prose-invert prose-lg mx-auto prose-p:text-gray-300 prose-headings:text-white prose-a:text-[#00DD82] hover:prose-a:text-green-400 prose-strong:text-white">
          <ReactMarkdown components={renderers}>{postData.content}</ReactMarkdown>
        </div>

        {postData.tags && postData.tags.length > 0 && (
          <div className="mt-12 text-center">
            {postData.tags.map((tag: string) => (
              <Link href={`/blog/tag/${encodeURIComponent(tag)}`} key={tag}>
                <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2 hover:bg-gray-600 transition-colors">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16 p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl border border-gray-700 text-center shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-4">
            {language === 'es' ? '¿Querés saber qué está frenando tu crecimiento?' : 'Want to know what is holding back your growth?'}
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {language === 'es' ? 'Descubrí en menos de 2 minutos qué áreas de tu estrategia digital necesitan atención urgente.' : 'Discover in less than 2 minutes which areas of your digital strategy need urgent attention.'}
          </p>
          <Link href="/diagnostico" className="inline-block bg-[#00DD82] text-black font-bold uppercase px-8 py-4 rounded-md hover:bg-green-400 transition-all duration-300 text-lg shadow-lg">
            {language === 'es' ? 'HACER DIAGNÓSTICO GRATUITO' : 'TAKE FREE DIAGNOSTIC'}
          </Link>
        </div>

        <RecommendedPosts posts={relatedPosts} />
      </article>
    </main>
  );
}