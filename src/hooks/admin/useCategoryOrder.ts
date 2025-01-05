import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export function useCategoryOrder() {
  const [updating, setUpdating] = useState(false);

  const moveCategory = async (categoryId: string, newOrder: number) => {
    setUpdating(true);
    try {
      const { data: category } = await supabase
        .from('article_categories')
        .select('display_order')
        .eq('id', categoryId)
        .single();

      if (!category) throw new Error('Category not found');

      await supabase.rpc('reorder_categories', {
        category_id: categoryId,
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
    moveCategory,
    updating
  };
}