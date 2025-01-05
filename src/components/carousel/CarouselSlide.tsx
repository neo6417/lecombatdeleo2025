import React from 'react';

interface CarouselSlideProps {
  image: {
    url: string;
    alt: string;
    title: string;
  };
  isActive: boolean;
  isMobile: boolean;
}

export function CarouselSlide({ image, isActive }: CarouselSlideProps) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-white/10" />
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-contain bg-white"
        loading="lazy"
      />
    </div>
  );
}