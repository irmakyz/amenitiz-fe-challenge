export function getGridColumnCount(width: number): number {
  switch (true) {
    case width < 640:
      return 4;
    case width < 768:
      return 8;
    case width < 1024:
      return 12;
    default:
      return 16;
  }
}

export function calculateItemsPerPage(containerHeight: number, itemHeight: number, columns: number): number {
  const rows = Math.floor(containerHeight / itemHeight);
  return rows * columns;
}