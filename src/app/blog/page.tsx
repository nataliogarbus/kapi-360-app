import { getSortedPostsData } from '@/lib/posts';
import { tagPillarMapping } from '@/lib/tag-mapping';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogList from '@/components/BlogList';

export default function BlogHome() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 bg-[#1a1a1a] text-white">
      <Header />
      <div className="w-full max-w-4xl mx-auto py-12 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-white">Blog Estratégico de Kapi</h1>
        <BlogList allPostsData={allPostsData} tagMapping={tagPillarMapping} />
      </div>
      <Footer />
    </main>
  );
}