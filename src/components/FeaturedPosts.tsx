'use client';

import Link from 'next/link';

// Definimos el tipo para un solo post, para asegurar que los datos que lleguen sean correctos
type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
};

// El componente recibe un array de posts como propiedades
const FeaturedPosts = ({ posts }: { posts: Post[] }) => {
  return (
    <section id="blog-destacados" className="py-20 sm:py-32 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-cyan-400 tracking-wider uppercase">Análisis Recientes</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Desde Nuestro Blog</p>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.slug} className="block bg-gray-800/50 rounded-2xl p-8 flex flex-col h-full hover:bg-gray-700/50 transition-colors duration-300">
                <div className="flex-grow">
                  <Link 
                    href={`/blog/category/${encodeURIComponent(post.category)}`}
                    onClick={(e) => e.stopPropagation()} // Detiene el clic para no ir al post
                    className="text-sm font-semibold text-cyan-400 uppercase hover:text-cyan-300 transition-colors relative z-10"
                  >
                    {post.category}
                  </Link>
                  <h3 className="text-xl font-bold text-white mt-2">{post.title}</h3>
                  <p className="mt-4 text-gray-300">{post.excerpt}</p>
                </div>
                <div className="mt-6">
                  <Link href={`/blog/${post.slug}`} className="text-blue-400 font-semibold">
                    Leer más &rarr;
                  </Link>
                </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16 flex justify-center items-center flex-wrap gap-4">
          <Link href="/blog">
            <span className="inline-block bg-cyan-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-cyan-600 transition-colors duration-300 text-lg cursor-pointer">
              Ver todos los artículos
            </span>
          </Link>
          <Link href="/blog">
            <span className="inline-block border border-cyan-500 text-cyan-500 font-bold py-3 px-8 rounded-lg hover:bg-cyan-500 hover:text-black transition-colors duration-300 text-lg cursor-pointer">
              Explorar por Categorías
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;