import Link from 'next/link';
import { PostData } from '@/app/types';

const RecommendedPosts = ({ posts }: { posts: PostData[] }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-12 border-t border-gray-700/50">
      <h2 className="text-2xl font-bold text-center text-white mb-8">Lecturas Recomendadas</h2>
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="block bg-gray-800/50 rounded-2xl p-8 flex flex-col h-full hover:bg-gray-700/50 transition-colors duration-300">
            <div className="flex-grow">
              <p className="text-sm font-semibold text-cyan-400 uppercase">{post.category}</p>
              <h3 className="text-xl font-bold text-white mt-2">{post.title}</h3>
              <p className="mt-4 text-gray-300 text-sm">{post.excerpt}</p>
            </div>
            <div className="mt-6">
              <p className="text-blue-400 font-semibold text-sm">
                Leer más &rarr;
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPosts;
