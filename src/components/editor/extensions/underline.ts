import { Mark } from '@tiptap/core';

export interface UnderlineOptions {
  styles: string[];
  colors: string[];
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customUnderline: {
      setUnderline: (attributes: { style?: string; color?: string }) => ReturnType;
      unsetUnderline: () => ReturnType;
    };
  }
}

export const CustomUnderline = Mark.create<UnderlineOptions>({
  name: 'customUnderline',

  addOptions() {
    return {
      styles: ['solid', 'dotted', 'dashed', 'double', 'wavy'],
      colors: ['currentColor', '#FF0000', '#00FF00', '#0000FF'],
    };
  },

  addAttributes() {
    return {
      style: {
        default: 'solid',
        parseHTML: element => element.style.textDecorationStyle || 'solid',
        renderHTML: attributes => ({
          style: `text-decoration-style: ${attributes.style}`,
        }),
      },
      color: {
        default: 'currentColor',
        parseHTML: element => element.style.textDecorationColor || 'currentColor',
        renderHTML: attributes => ({
          style: `text-decoration-color: ${attributes.color}`,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[style*="text-decoration"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', {
      style: `text-decoration: underline ${HTMLAttributes.style} ${HTMLAttributes.color}`,
    }, 0];
  },

  addCommands() {
    return {
      setUnderline: attributes => ({ chain }) => {
        return chain()
          .setMark(this.name, attributes)
          .run();
      },
      unsetUnderline: () => ({ chain }) => {
        return chain()
          .unsetMark(this.name)
          .run();
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-u': () => this.editor.commands.setUnderline({}),
    };
  },
});