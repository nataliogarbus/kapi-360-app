'use client';

import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) {
    return null; // No mostrar paginación si solo hay una página
  }

  const handlePrev = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  return (
    <nav className="flex justify-center items-center space-x-2 mt-16" aria-label="Pagination">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
      >
        Anterior
      </button>

      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            currentPage === number
              ? 'bg-cyan-500 text-black font-bold'
              : 'text-gray-300 bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
      >
        Siguiente
      </button>
    </nav>
  );
};

export default Pagination;
