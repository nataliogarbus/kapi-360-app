import { getPostData, getAllPostIds, getSortedPostsData } from '@/lib/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import RecommendedPosts from '@/components/RecommendedPosts';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map(p => ({ slug: p.params.slug }));
}

export default function Post({ params }: { params: { slug: string } }) {
  const postData = getPostData(params.slug);
  const allPosts = getSortedPostsData();
  const baseUrl = 'https://kapi-360-app.vercel.app';

  // Lógica para encontrar posts relacionados
  const relatedPosts = allPosts
    .filter(p => p.slug !== postData.slug) // Excluir el post actual
    .map(p => {
      let score = 0;
      // 2 puntos por cada tag compartido
      score += p.tags?.filter(tag => postData.tags?.includes(tag)).length * 2;
      // 1 punto si la categoría es la misma
      if (p.category === postData.category) {
        score += 1;
      }
      return { ...p, score };
    })
    .filter(p => p.score > 0) // Solo incluir posts con alguna relación
    .sort((a, b) => b.score - a.score) // Ordenar por puntaje
    .slice(0, 3); // Tomar los 3 mejores

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

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 bg-[#1a1a1a] text-white">
      <Header />
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
            <p className="mt-4 text-lg text-gray-400">{new Date(postData.date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          )}
        </div>
        <div className="prose prose-invert prose-lg mx-auto">
          <ReactMarkdown>{postData.content}</ReactMarkdown>
        </div>
        {postData.tags && postData.tags.length > 0 && (
          <div className="mt-12 text-center">
            {postData.tags.map((tag) => (
              <Link href={`/blog/tag/${encodeURIComponent(tag)}`} key={tag}>
                <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2 hover:bg-gray-600 transition-colors">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        )}
        <RecommendedPosts posts={relatedPosts} />
      </article>
      <Footer />
    </main>
  );
}