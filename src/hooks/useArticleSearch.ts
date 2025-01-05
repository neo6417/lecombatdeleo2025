import { useState, useMemo } from 'react';
import type { Article } from '../types/article';

export function useArticleSearch(articles: Article[], searchTerm: string) {
  return useMemo(() => {
    if (!searchTerm) return articles;

    const normalizedSearch = searchTerm.toLowerCase();
    return articles.filter((article) => 
      article.title.toLowerCase().includes(normalizedSearch) ||
      article.excerpt?.toLowerCase().includes(normalizedSearch)
    );
  }, [articles, searchTerm]);
}