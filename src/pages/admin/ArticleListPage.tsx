import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { AdminArticleList } from '../../components/admin/AdminArticleList';
import { Button } from '../../components/ui/Button';

export function ArticleListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des articles</h1>
        <Link to="/admin/articles/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvel article
          </Button>
        </Link>
      </div>
      <AdminArticleList />
    </div>
  );
}