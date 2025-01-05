import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';
import { useCategoryManagement } from '../../hooks/admin/useCategoryManagement';
import { CategoryList } from '../../components/admin/categories/CategoryList';
import { CategoryForm } from '../../components/admin/categories/CategoryForm';
import { Button } from '../../components/ui/Button';
import type { Category } from '../../types/category';

export function CategoriesPage() {
  const { categories, loading, error } = useCategories();
  const { createCategory, updateCategory, deleteCategory, reorderCategory, updating } = useCategoryManagement();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleSubmit = async (data: Partial<Category>) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, data);
      } else {
        await createCategory(data);
      }
      setShowForm(false);
      setEditingCategory(null);
      window.location.reload(); // Recharger pour voir les changements
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Une erreur est survenue lors de la sauvegarde de la catégorie');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      return;
    }

    try {
      await deleteCategory(id);
      window.location.reload(); // Recharger pour voir les changements
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Une erreur est survenue lors de la suppression de la catégorie');
    }
  };

  const handleOrderChange = async (id: string, newOrder: number) => {
    try {
      await reorderCategory(id, newOrder);
      window.location.reload(); // Recharger pour voir les changements
    } catch (error) {
      console.error('Error reordering category:', error);
      alert('Une erreur est survenue lors du réordonnancement de la catégorie');
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await updateCategory(id, { is_active: isActive });
      window.location.reload(); // Recharger pour voir les changements
    } catch (error) {
      console.error('Error toggling category:', error);
      alert('Une erreur est survenue lors de la modification du statut de la catégorie');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des catégories</h1>
        <Button onClick={() => setShowForm(true)} disabled={updating}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle catégorie
        </Button>
      </div>

      {(showForm || editingCategory) && (
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
          </h2>
          <CategoryForm
            initialData={editingCategory || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingCategory(null);
            }}
          />
        </div>
      )}

      <CategoryList
        categories={categories}
        onEdit={setEditingCategory}
        onDelete={handleDelete}
        onOrderChange={handleOrderChange}
        onToggleActive={handleToggleActive}
      />
    </div>
  );
}