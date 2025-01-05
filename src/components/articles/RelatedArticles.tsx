import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../../types/article';

interface RelatedArticlesProps {
  articles: Article[];
  currentArticleId: string;
}

export function RelatedArticles({ articles, currentArticleId }: RelatedArticlesProps) {
  const relatedArticles = articles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 3);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="mt-12 pt-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedArticles.map(article => (
          <article key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {article.featured_image && (
              <Link to={`/articles/${article.slug}`}>
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
            )}
            <div className="p-6">
              <Link to={`/articles/${article.slug}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                  {article.title}
                </h3>
              </Link>
              {article.excerpt && (
                <p className="text-gray-600 line-clamp-2">{article.excerpt}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}