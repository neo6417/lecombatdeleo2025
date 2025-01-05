import React from 'react';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface ImageControlsProps {
  alignment: string;
  onAlignmentChange: (alignment: string) => void;
}

export function ImageControls({ alignment, onAlignmentChange }: ImageControlsProps) {
  return (
    <div className="absolute -top-8 left-0 right-0 hidden group-hover:flex items-center justify-center gap-2 bg-white shadow-sm rounded-t-md p-1">
      <button
        onClick={() => onAlignmentChange('left')}
        className={`p-1 rounded hover:bg-gray-100 ${alignment === 'left' ? 'bg-gray-100' : ''}`}
        title="Aligner à gauche"
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => onAlignmentChange('center')}
        className={`p-1 rounded hover:bg-gray-100 ${alignment === 'center' ? 'bg-gray-100' : ''}`}
        title="Centrer"
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        onClick={() => onAlignmentChange('right')}
        className={`p-1 rounded hover:bg-gray-100 ${alignment === 'right' ? 'bg-gray-100' : ''}`}
        title="Aligner à droite"
      >
        <AlignRight className="w-4 h-4" />
      </button>
    </div>
  );
}