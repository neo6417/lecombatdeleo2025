import React from 'react';

interface ImageGalleryProps {
  images: string[];
  onImageSelect: (url: string) => void;
}

export function ImageGallery({ images, onImageSelect }: ImageGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((url, index) => (
        <button
          key={index}
          onClick={() => onImageSelect(url)}
          className="relative aspect-square group overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <img
            src={url}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm">Insérer</span>
          </div>
        </button>
      ))}
    </div>
  );
}