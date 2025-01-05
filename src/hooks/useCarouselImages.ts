import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface CarouselImage {
  id: string;
  title: string;
  alt: string;
  url: string;
  order: number;
}

export function useCarouselImages() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('carousel_images')
        .select('*')
        .order('order');
      
      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erreur lors du chargement des images'));
    } finally {
      setLoading(false);
    }
  };

  const addImage = async (image: Omit<CarouselImage, 'id'>) => {
    try {
      const { error } = await supabase
        .from('carousel_images')
        .insert([image]);
      
      if (error) throw error;
      await fetchImages();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de l\'ajout de l\'image');
    }
  };

  const updateImage = async (id: string, updates: Partial<CarouselImage>) => {
    try {
      const { error } = await supabase
        .from('carousel_images')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      await fetchImages();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour de l\'image');
    }
  };

  const deleteImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('carousel_images')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await fetchImages();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la suppression de l\'image');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return {
    images,
    loading,
    error,
    addImage,
    updateImage,
    deleteImage,
    refresh: fetchImages
  };
}