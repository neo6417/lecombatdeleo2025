import React, { useState } from 'react';
import { useArticles } from '../hooks/useArticles';
import { useArticleSearch } from '../hooks/useArticleSearch';
import { usePagination } from '../hooks/usePagination';
import { ArticleGrid } from '../components/articles/ArticleGrid';
import { ArticleFilter } from '../components/articles/ArticleFilter';
import { CategoryFilter } from '../components/articles/CategoryFilter';
import { ArticlePagination } from '../components/articles/ArticlePagination';

const ITEMS_PER_PAGE = 9;

export function ArticlesPage() {
  const { articles, loading, error } = useArticles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredArticles = useArticleSearch(articles, searchTerm).filter(article => 
    !selectedCategory || article.category_id === selectedCategory
  );

  const { 
    currentPage, 
    setCurrentPage, 
    paginatedItems: paginatedArticles, 
    totalPages 
  } = usePagination({
    items: filteredArticles,
    itemsPerPage: ITEMS_PER_PAGE
  });

  if (loading) return <div>Chargement des articles...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Articles</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Découvrez nos derniers articles et actualités sur la recherche et l'accompagnement.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <div className="max-w-md mx-auto">
          <ArticleFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {filteredArticles.length === 0 ? (
        <p className="text-center text-gray-600">
          Aucun article ne correspond à votre recherche.
        </p>
      ) : (
        <>
          <ArticleGrid articles={paginatedArticles} />
          
          {totalPages > 1 && (
            <div className="mt-12">
              <ArticlePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}