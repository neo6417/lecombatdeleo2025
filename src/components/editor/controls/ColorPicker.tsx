import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Palette } from 'lucide-react';

const colors = [
  { label: 'Noir', value: '#000000' },
  { label: 'Gris', value: '#666666' },
  { label: 'Rouge', value: '#FF0000' },
  { label: 'Bleu', value: '#0000FF' },
  { label: 'Vert', value: '#008000' },
];

interface ColorPickerProps {
  editor: Editor;
}

export function ColorPicker({ editor }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded hover:bg-gray-200"
        title="Couleur du texte"
      >
        <Palette className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-10 top-full left-0 mt-1 bg-white rounded-lg shadow-lg p-2">
          <div className="grid grid-cols-5 gap-1">
            {colors.map(color => (
              <button
                key={color.value}
                onClick={() => {
                  editor.chain().focus().setTextColor(color.value).run();
                  setIsOpen(false);
                }}
                className="w-6 h-6 rounded border border-gray-200"
                style={{ backgroundColor: color.value }}
                title={color.label}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}