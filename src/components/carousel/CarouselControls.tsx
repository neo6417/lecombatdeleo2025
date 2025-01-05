import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  showControls: boolean;
}

export function CarouselControls({
  onPrevClick,
  onNextClick,
  showControls
}: CarouselControlsProps) {
  if (!showControls) return null;

  return (
    <>
      <button
        onClick={onPrevClick}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 transition-all"
        aria-label="Image précédente"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={onNextClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100/80 hover:bg-gray-200/80 text-gray-700 transition-all"
        aria-label="Image suivante"
      >
        <ChevronRight size={24} />
      </button>
    </>
  );
}