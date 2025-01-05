import React from 'react';

interface MarkdownImageProps {
  src?: string;
  alt?: string;
}

export function MarkdownImage({ src, alt }: MarkdownImageProps) {
  if (!src) return null;

  return (
    <div className="my-8">
      <img 
        src={src} 
        alt={alt || ''} 
        className="rounded-lg w-full object-cover max-h-[600px]" 
        loading="lazy"
      />
      {alt && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          {alt}
        </p>
      )}
    </div>
  );
}