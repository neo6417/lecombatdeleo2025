import React from 'react';

interface CarouselIndicatorsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export function CarouselIndicators({ total, current, onChange }: CarouselIndicatorsProps) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`h-2 rounded-full transition-all ${
            index === current 
              ? 'w-8 bg-gray-800' 
              : 'w-2 bg-gray-400 hover:bg-gray-600'
          }`}
          aria-label={`Aller à l'image ${index + 1}`}
          aria-current={index === current}
        />
      ))}
    </div>
  );
}