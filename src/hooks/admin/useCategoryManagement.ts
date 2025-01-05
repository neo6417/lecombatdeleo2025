import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { slugify } from '../../utils/slugify';
import type { Category } from '../../types/category';

export function useCategoryManagement() {
  const [updating, setUpdating] = useState(false);

  const createCategory = async (data: Partial<Category>) => {
    setUpdating(true);
    try {
      const slug = await slugify(data.name || '');
      const { error } = await supabase
        .from('article_categories')
        .insert([{ ...data, slug }]);
      if (error) throw error;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    } finally {
      setUpdating(false);
    }
  };

  const updateCategory = async (id: string, data: Partial<Category>) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('article_categories')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    } finally {
      setUpdating(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('article_categories')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    } finally {
      setUpdating(false);
    }
  };

  const reorderCategory = async (id: string, newOrder: number) => {
    setUpdating(true);
    try {
      const { data: category } = await supabase
        .from('article_categories')
        .select('display_order')
        .eq('id', id)
        .single();

      if (!category) throw new Error('Category not found');

      await supabase.rpc('reorder_categories', {
        category_id: id,
        new_order: newOrder,
        current_order: category.display_order
      });
    } catch (error) {
      console.error('Error reordering category:', error);
      throw error;
    } finally {
      setUpdating(false);
    }
  };

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    reorderCategory,
    updating
  };
}