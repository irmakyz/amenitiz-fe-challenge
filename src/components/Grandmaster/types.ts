export interface GrandmasterItemProps {
  username: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}