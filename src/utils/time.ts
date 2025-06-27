export function formatSeconds(seconds: number): string {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export function formatDate(ms: number): string {
  const d = new Date(ms);
  return d.toLocaleDateString('en-US', {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}