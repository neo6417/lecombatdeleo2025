import React from 'react';
import { ArticleCard } from './ArticleCard';
import { useArticles } from '../../hooks/useArticles';

export function ArticleList() {
  const { articles, loading, error } = useArticles();

  if (loading) return <div>Chargement des articles...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </div>
  );
}