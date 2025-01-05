import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ResizableImageView } from '../views/ResizableImageView';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    resizableImage: {
      setImage: (options: { src: string, alt?: string, width?: string, alignment?: string }) => ReturnType;
    };
  }
}

export const ResizableImage = Node.create({
  name: 'resizableImage',
  group: 'block',
  draggable: true,
  selectable: true,
  
  addAttributes() {
    return {
      src: { 
        default: null,
        parseHTML: element => element.querySelector('img')?.getAttribute('src'),
      },
      alt: { 
        default: null,
        parseHTML: element => element.querySelector('img')?.getAttribute('alt'),
      },
      width: { 
        default: '100%',
        parseHTML: element => element.style.width,
      },
      alignment: { 
        default: 'center',
        parseHTML: element => {
          const classes = element.className.split(' ');
          const alignClass = classes.find(c => c.startsWith('image-align-'));
          return alignClass ? alignClass.replace('image-align-', '') : 'center';
        }
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="resizable-image"]',
      },
      {
        tag: 'img[src]',
        getAttrs: el => ({
          src: (el as HTMLImageElement).getAttribute('src'),
          alt: (el as HTMLImageElement).getAttribute('alt'),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', {
      'data-type': 'resizable-image',
      'class': `image-align-${HTMLAttributes.alignment}`,
      style: `width: ${HTMLAttributes.width}`
    }, ['img', { 
      src: HTMLAttributes.src, 
      alt: HTMLAttributes.alt,
      style: 'width: 100%; height: auto;'
    }]];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },

  addCommands() {
    return {
      setImage: options => ({ chain }) => {
        return chain()
          .insertContent({
            type: this.name,
            attrs: {
              ...options,
              width: options.width || '100%',
              alignment: options.alignment || 'center'
            }
          })
          .run();
      },
    };
  },
});