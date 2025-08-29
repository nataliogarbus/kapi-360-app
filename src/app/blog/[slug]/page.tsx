import { getPostData, getAllPostIds } from '@/lib/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map(p => ({ slug: p.params.slug }));
}

export default function Post({ params }: { params: { slug: string } }) {
  const postData = getPostData(params.slug);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 bg-[#1a1a1a] text-white">
      <Header />
      <article className="w-full max-w-3xl mx-auto py-12 sm:py-24">
        <div className="mb-8 text-center">
          {postData.category && (
            <p className="text-base text-cyan-400 font-semibold tracking-wide uppercase">{postData.category}</p>
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
              <span key={tag} className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
      <Footer />
    </main>
  );
}
