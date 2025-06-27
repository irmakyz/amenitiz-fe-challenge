"use client";

import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGrandmasters } from "@/api/chessApi";
import { Pagination, Loader, ErrorHandler } from "@/components";
const LazyGrandmasterItem = lazy(
  () => import("@/components/Grandmaster/GrandmasterItem")
);

import { calculateItemsPerPage, getGridColumnCount } from "@/utils/pagination";

export default function GrandmasterList() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["grandmasters"],
    queryFn: fetchGrandmasters,
  });

  const containerRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    const updatePagination = () => {
      if (!containerRef.current || !itemRef.current) return;

      const containerHeight = containerRef.current.clientHeight;
      const itemHeight = itemRef.current.clientHeight;
      const columns = getGridColumnCount(window.innerWidth);

      setItemsPerPage(
        calculateItemsPerPage(containerHeight, itemHeight, columns)
      );
    };

    updatePagination();
    window.addEventListener("resize", updatePagination);
    return () => window.removeEventListener("resize", updatePagination);
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorHandler message='Failed to load grandmasters.' />;
  if (data.length === 0)
    return <ErrorHandler message='No grandmasters found.' />;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <div
      className='flex flex-col flex-grow'
      role='region'
      aria-label='Grandmaster list section'
    >
      <ul
        ref={containerRef}
        role='list'
        aria-label='List of chess grandmasters'
        className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4 flex-grow'
        style={{ height: "100%" }}
      >
        <Suspense fallback={<Loader />}>
          {currentItems.map((gm, index) => (
            <LazyGrandmasterItem
              key={gm}
              username={gm}
              ref={index === 0 ? itemRef : undefined}
            />
          ))}
        </Suspense>
      </ul>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
