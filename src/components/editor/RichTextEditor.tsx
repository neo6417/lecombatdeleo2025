import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ResizableImage } from './extensions/resizableImage';
import { TextStyle } from './extensions/textStyle';
import { TextAlign } from './extensions/textAlign';
import Link from '@tiptap/extension-link';
import { EditorToolbar } from './EditorToolbar';
import './editor.css';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizableImage,
      TextStyle,
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <EditorToolbar editor={editor} />
      <div className="px-4 py-3 min-h-[400px] prose prose-lg max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}