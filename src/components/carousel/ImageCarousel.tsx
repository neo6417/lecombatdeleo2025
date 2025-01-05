import React from 'react';
import { useCarouselImages } from '../../hooks/useCarouselImages';
import { useCarousel } from '../../hooks/useCarousel';
import { CarouselControls } from './CarouselControls';
import { CarouselSlide } from './CarouselSlide';
import { CarouselIndicators } from './CarouselIndicators';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export function ImageCarousel() {
  const { images, loading } = useCarouselImages();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const {
    currentIndex,
    isPlaying,
    setIsPlaying,
    nextSlide,
    prevSlide,
    goToSlide
  } = useCarousel(images.length);

  if (loading) {
    return (
      <div className="relative aspect-[4/1] w-full bg-gray-100 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Chargement...
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative aspect-[4/1] w-full overflow-hidden bg-white"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {images.map((image, index) => (
        <CarouselSlide
          key={image.id}
          image={{
            url: image.url,
            alt: image.alt,
            title: image.title
          }}
          isActive={index === currentIndex}
          isMobile={isMobile}
        />
      ))}

      <CarouselControls
        onPrevClick={prevSlide}
        onNextClick={nextSlide}
        showControls={!isMobile}
      />

      <CarouselIndicators
        total={images.length}
        current={currentIndex}
        onChange={goToSlide}
      />
    </div>
  );
}