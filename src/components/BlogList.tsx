'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PostData } from '@/app/types';
import Pagination from './Pagination';

interface BlogListProps {
  allPostsData: PostData[];
  tagMapping: { [key: string]: string[] };
}

const POSTS_PER_PAGE = 5;

export default function BlogList({ allPostsData, tagMapping }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(allPostsData);
  const [selectedPillar, setSelectedPillar] = useState<string>(Object.keys(tagMapping)[0]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = lowercasedQuery === ''
      ? allPostsData
      : allPostsData.filter(post => 
          post.title.toLowerCase().includes(lowercasedQuery) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(lowercasedQuery))
        );
    
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset page to 1 on new search
  }, [searchQuery, allPostsData]);

  const pillars = Object.keys(tagMapping);

  // Pagination logic
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar artículos por título o tema..."
          className="w-full max-w-lg px-4 py-3 bg-gray-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
        />
      </div>

      <div className="mb-8 flex justify-center flex-wrap gap-4">
        {pillars.map(pillar => (
          <button
            key={pillar}
            onClick={() => setSelectedPillar(pillar)}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors duration-200 ${
              selectedPillar === pillar 
              ? 'bg-cyan-500 text-black' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {pillar}
          </button>
        ))}
      </div>

      <div className="mb-12 flex justify-center flex-wrap gap-3 text-center p-4 border-2 border-dashed border-gray-700 rounded-xl min-h-[80px]">
        {tagMapping[selectedPillar].map(tag => (
          <Link href={`/blog/tag/${encodeURIComponent(tag)}`} key={tag}>
            <span className="inline-block bg-gray-600 rounded-full px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-cyan-700 hover:text-white transition-colors duration-300 cursor-pointer">
              #{tag}
            </span>
          </Link>
        ))}
      </div>

      <div className="space-y-8 min-h-[550px]">
        {currentPosts.length > 0 ? (
          currentPosts.map(({ slug, title, date, excerpt }) => (
            <Link href={`/blog/${slug}`} key={slug}>
              <div className="block bg-gray-800/50 p-8 rounded-lg hover:bg-gray-700/50 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">{title}</h2>
                <p className="text-gray-400 mb-4">{new Date(date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-gray-300">{excerpt}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg pt-16">No se encontraron artículos que coincidan con tu búsqueda.</p>
        )}
      </div>

      <Pagination 
        totalItems={filteredPosts.length}
        itemsPerPage={POSTS_PER_PAGE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}