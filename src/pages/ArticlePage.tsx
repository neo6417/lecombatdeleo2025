import React from 'react';
import { useParams } from 'react-router-dom';
import { useArticle } from '../hooks/useArticle';
import { ArticleContent } from '../components/articles/ArticleContent';
import { ArticleMeta } from '../components/articles/ArticleMeta';
import { ShareButtons } from '../components/articles/ShareButtons';
import { calculateReadingTime } from '../utils/readingTime';

export function ArticlePage() {
  const { slug } = useParams();
  const { article, loading, error } = useArticle(slug);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!article) return <div>Article non trouvé</div>;

  const readingTime = calculateReadingTime(article.content || '');

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {article.featured_image && (
        <img
          src={article.featured_image}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}

      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <ArticleMeta
          authorId={article.author_id}
          createdAt={article.created_at}
          readingTime={readingTime}
        />
        <ShareButtons
          url={window.location.href}
          title={article.title}
        />
      </div>

      {article.excerpt && (
        <div className="text-xl text-gray-600 mb-8 font-serif">
          {article.excerpt}
        </div>
      )}

      {article.content && (
        <ArticleContent content={article.content} />
      )}
    </article>
  );
}