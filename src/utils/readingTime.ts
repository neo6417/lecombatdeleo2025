export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  if (minutes < 1) return 'Moins d\'1 min de lecture';
  return `${minutes} min de lecture`;
}