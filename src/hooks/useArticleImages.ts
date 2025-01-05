import { useState, useCallback } from 'react';

export function useArticleImages() {
  const [images, setImages] = useState<string[]>([]);

  const addImage = useCallback((url: string) => {
    setImages(prev => [...prev, url]);
  }, []);

  return { images, addImage };
}