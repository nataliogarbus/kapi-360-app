import Link from 'next/link';
import { getSortedPostsData, getAllTags } from '@/lib/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  const paths = getAllTags();
  return paths.map(p => ({ tag: p.params.tag }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const allPosts = getSortedPostsData();
  const decodedTag = decodeURIComponent(params.tag);

  const filteredPosts = allPosts.filter(post => post.tags && post.tags.includes(decodedTag));

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 bg-[#1a1a1a] text-white">
      <div className="w-full max-w-4xl mx-auto py-12 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center text-white">Etiqueta: #{decodedTag}</h1>
        <p className="text-center text-gray-400 mb-12">{filteredPosts.length} artículo(s) encontrado(s)</p>
        <div className="space-y-8">
          {filteredPosts.map(({ slug, title, date, excerpt }) => (
            <Link href={`/blog/${slug}`} key={slug}>
              <div className="block bg-gray-800/50 p-8 rounded-lg hover:bg-gray-700/50 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">{title}</h2>
                <p className="text-gray-400 mb-4">{new Date(date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-gray-300">{excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link href="/blog">
            <p className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold">
              &larr; Volver a todos los artículos
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
