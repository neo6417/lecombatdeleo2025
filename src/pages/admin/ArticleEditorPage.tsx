import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleForm } from '../../components/admin/ArticleForm';
import { useArticleEditor } from '../../hooks/admin/useArticleEditor';

export function ArticleEditorPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { article, loading, error, saveArticle } = useArticleEditor(slug);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {slug ? 'Modifier l\'article' : 'Nouvel article'}
      </h1>
      <ArticleForm
        initialData={article}
        onSubmit={async (data) => {
          await saveArticle(data);
          navigate('/admin/articles');
        }}
      />
    </div>
  );
}