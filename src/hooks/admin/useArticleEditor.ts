import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { generateUniqueSlug } from '../../utils/slugify';
import type { Article } from '../../types/article';

interface ArticleData {
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  status: 'draft' | 'published';
  category_id: string | null;
}

export function useArticleEditor(slug: string | undefined) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    async function fetchArticle() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  const saveArticle = async (data: ArticleData) => {
    try {
      const uniqueSlug = await generateUniqueSlug(data.title, slug);
      
      // Récupérer le dernier ordre d'affichage
      const { data: lastArticle } = await supabase
        .from('articles')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)
        .single();

      const displayOrder = lastArticle ? lastArticle.display_order + 1 : 1;
      
      if (slug) {
        // Mise à jour
        const { error } = await supabase
          .from('articles')
          .update({ 
            ...data, 
            slug: uniqueSlug,
            updated_at: new Date().toISOString()
          })
          .eq('slug', slug);
        
        if (error) throw error;
      } else {
        // Création
        const { error } = await supabase
          .from('articles')
          .insert([{ 
            ...data, 
            slug: uniqueSlug,
            display_order: displayOrder,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
        
        if (error) throw error;
      }
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      throw err instanceof Error ? err : new Error('Une erreur est survenue lors de la sauvegarde');
    }
  };

  return { article, loading, error, saveArticle };
}