import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { ImageUploader } from './ImageUploader';
import { RichTextEditor } from '../editor/RichTextEditor';
import { useCategories } from '../../hooks/useCategories';
import type { Article } from '../../types/article';

interface ArticleFormData {
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  status: 'draft' | 'published';
  category_id: string | null;
}

interface ArticleFormProps {
  initialData?: Partial<Article>;
  onSubmit: (data: ArticleFormData) => Promise<void>;
}

export function ArticleForm({ initialData, onSubmit }: ArticleFormProps) {
  const { categories } = useCategories();
  const [formData, setFormData] = useState<ArticleFormData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    featured_image: initialData?.featured_image || '',
    status: initialData?.status || 'draft',
    category_id: initialData?.category_id || null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Catégorie</label>
        <select
          value={formData.category_id || ''}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            category_id: e.target.value || null 
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image à la une</label>
        <div className="mt-1">
          <ImageUploader 
            onUploadComplete={(url) => {
              setFormData(prev => ({ ...prev, featured_image: url }));
            }}
            currentImage={formData.featured_image}
            previewSize="lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Extrait</label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
        <RichTextEditor
          content={formData.content}
          onChange={(content) => setFormData(prev => ({ ...prev, content }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Statut</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            status: e.target.value as 'draft' | 'published' 
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="draft">Brouillon</option>
          <option value="published">Publié</option>
        </select>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          {initialData ? "Mettre à jour" : "Créer l'article"}
        </Button>
      </div>
    </form>
  );
}