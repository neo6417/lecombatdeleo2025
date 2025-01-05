import { Extension } from '@tiptap/core';

export const Typography = Extension.create({
  name: 'typography',

  addKeyboardShortcuts() {
    return {
      'Alt-q': () => this.editor.commands.toggleBlockquote(),
      'Alt-b': () => this.editor.commands.toggleBold(),
      'Alt-i': () => this.editor.commands.toggleItalic(),
      'Alt-u': () => this.editor.commands.toggleUnderline(),
      'Alt-s': () => this.editor.commands.toggleStrike(),
      'Alt-`': () => this.editor.commands.toggleCodeBlock(),
    };
  },
});