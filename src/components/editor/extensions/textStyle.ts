import { Mark } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textStyle: {
      setTextColor: (color: string) => ReturnType;
      setFontSize: (size: string) => ReturnType;
    };
  }
}

export const TextStyle = Mark.create({
  name: 'textStyle',

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: element => element.style.color,
        renderHTML: attributes => {
          if (!attributes.color) return {};
          return { style: `color: ${attributes.color}` };
        },
      },
      fontSize: {
        default: null,
        parseHTML: element => element.style.fontSize,
        renderHTML: attributes => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}` };
        },
      },
    };
  },

  parseHTML() {
    return [{ style: 'color' }, { style: 'font-size' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setTextColor: color => ({ chain }) => {
        return chain().setMark(this.name, { color }).run();
      },
      setFontSize: size => ({ chain }) => {
        return chain().setMark(this.name, { fontSize: size }).run();
      },
    };
  },
});