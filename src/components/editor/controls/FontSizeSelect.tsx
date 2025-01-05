import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Type } from 'lucide-react';

const sizes = [
  { label: 'Normal', value: '1rem' },
  { label: 'Petit', value: '0.875rem' },
  { label: 'Grand', value: '1.25rem' },
  { label: 'Très grand', value: '1.5rem' },
];

interface FontSizeSelectProps {
  editor: Editor;
}

export function FontSizeSelect({ editor }: FontSizeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded hover:bg-gray-200"
        title="Taille du texte"
      >
        <Type className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-10 top-full left-0 mt-1 bg-white rounded-lg shadow-lg p-2 min-w-[120px]">
          {sizes.map(size => (
            <button
              key={size.value}
              onClick={() => {
                editor.chain().focus().setFontSize(size.value).run();
                setIsOpen(false);
              }}
              className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
            >
              {size.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}