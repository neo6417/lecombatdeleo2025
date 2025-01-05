import React from 'react';
import { Editor } from '@tiptap/react';
import { Underline } from 'lucide-react';

const underlineStyles = [
  { label: 'Simple', value: 'solid' },
  { label: 'Pointillé', value: 'dotted' },
  { label: 'Tirets', value: 'dashed' },
  { label: 'Double', value: 'double' },
  { label: 'Ondulé', value: 'wavy' },
];

const underlineColors = [
  { label: 'Noir', value: '#000000' },
  { label: 'Rouge', value: '#FF0000' },
  { label: 'Bleu', value: '#0000FF' },
  { label: 'Vert', value: '#008000' },
];

interface UnderlineControlsProps {
  editor: Editor;
}

export function UnderlineControls({ editor }: UnderlineControlsProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive('customUnderline') ? 'bg-gray-200' : ''
        }`}
        title="Soulignement (Ctrl+U)"
      >
        <Underline className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-1 bg-white rounded-lg shadow-lg p-2 min-w-[200px]">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
            <div className="grid grid-cols-2 gap-1">
              {underlineStyles.map(style => (
                <button
                  key={style.value}
                  onClick={() => {
                    editor.chain().focus().setUnderline({ style: style.value }).run();
                  }}
                  className="px-2 py-1 text-sm rounded hover:bg-gray-100 text-left"
                >
                  <span style={{ textDecoration: `underline ${style.value}` }}>
                    {style.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
            <div className="grid grid-cols-2 gap-1">
              {underlineColors.map(color => (
                <button
                  key={color.value}
                  onClick={() => {
                    editor.chain().focus().setUnderline({ color: color.value }).run();
                  }}
                  className="px-2 py-1 text-sm rounded hover:bg-gray-100 text-left"
                >
                  <span style={{ textDecoration: 'underline', textDecorationColor: color.value }}>
                    {color.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}