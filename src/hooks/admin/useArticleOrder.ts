import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Article } from '../../types/article';

export function useArticleOrder() {
  const [updating, setUpdating] = useState(false);

  const moveArticle = async (articleId: string, newOrder: number) => {
    setUpdating(true);
    try {
      const { data: article } = await supabase
        .from('articles')
        .select('display_order')
        .eq('id', articleId)
        .single();

      if (!article) throw new Error('Article not found');

      const currentOrder = article.display_order;
      const direction = newOrder > currentOrder ? -1 : 1;

      // Update all articles between the old and new positions
      await supabase.rpc('reorder_articles', {
        article_id: articleId,
        new_order: newOrder,
        current_order: currentOrder
      });

    } catch (error) {
      console.error('Error updating article order:', error);
      throw error;
    } finally {
      setUpdating(false);
    }
  };

  return {
    moveArticle,
    updating
  };
}