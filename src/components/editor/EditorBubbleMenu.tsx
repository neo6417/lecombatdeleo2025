import React from 'react';
import { BubbleMenu, Editor } from '@tiptap/react';
import { Bold, Italic, Link as LinkIcon } from 'lucide-react';

interface EditorBubbleMenuProps {
  editor: Editor;
}

export function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
  const addLink = () => {
    const url = window.prompt('URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="bg-white rounded-lg shadow-lg border border-gray-200 flex overflow-hidden"
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={addLink}
        className={`p-2 hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-100' : ''}`}
      >
        <LinkIcon className="w-4 h-4" />
      </button>
    </BubbleMenu>
  );
}