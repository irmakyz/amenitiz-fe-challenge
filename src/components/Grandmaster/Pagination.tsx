'use client';

import { PaginationProps } from "./types";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage + 1 >= totalPages;

  return (
    <nav
      className="flex justify-center items-center gap-4 mt-6"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="Go to previous page"
        className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
      >
        Previous
      </button>

      <span
        className="text-sm text-gray-600"
        aria-live="polite"
        aria-atomic="true"
      >
        Page <strong>{currentPage + 1}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label="Go to next page"
        className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
      >
        Next
      </button>
    </nav>
  );
}
