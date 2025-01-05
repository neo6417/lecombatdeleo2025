import { useState, useEffect, useCallback } from 'react';

export function useCarousel(totalSlides: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) => 
      current === totalSlides - 1 ? 0 : current + 1
    );
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((current) => 
      current === 0 ? totalSlides - 1 : current - 1
    );
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  return {
    currentIndex,
    isPlaying,
    setIsPlaying,
    nextSlide,
    prevSlide,
    goToSlide
  };
}