import { Extension } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textAlign: {
      setTextAlign: (alignment: 'left' | 'center' | 'right' | 'justify') => ReturnType;
    };
  }
}

export const TextAlign = Extension.create({
  name: 'textAlign',

  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      alignments: ['left', 'center', 'right', 'justify'],
      defaultAlignment: 'left',
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: element => element.style.textAlign || this.options.defaultAlignment,
            renderHTML: attributes => ({
              style: `text-align: ${attributes.textAlign}`,
            }),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setTextAlign: alignment => ({ commands }) => {
        return this.options.types.every(type =>
          commands.updateAttributes(type, { textAlign: alignment })
        );
      },
    };
  },
});