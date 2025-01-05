import React from 'react';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featured_image: string | null;
  };
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
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
          <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
            {article.title}
          </h2>
        </Link>
        {article.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
        )}
        <Link
          to={`/articles/${article.slug}`}
          className="inline-block text-blue-600 hover:text-blue-800"
        >
          Lire la suite →
        </Link>
      </div>
    </article>
  );
}