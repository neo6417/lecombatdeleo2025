import React, { useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { ImageControls } from './ImageControls';
import { ResizeHandle } from './ResizeHandle';

export function ResizableImageView(props: any) {
  const [width, setWidth] = useState(props.node.attrs.width);
  const [alignment, setAlignment] = useState(props.node.attrs.alignment);

  const updateAttributes = (attrs: Record<string, any>) => {
    props.updateAttributes(attrs);
  };

  const handleResize = (newWidth: string) => {
    setWidth(newWidth);
    updateAttributes({ width: newWidth });
  };

  const handleAlignmentChange = (newAlignment: string) => {
    setAlignment(newAlignment);
    updateAttributes({ alignment: newAlignment });
  };

  return (
    <NodeViewWrapper>
      <div className="relative group my-4">
        <div className={`image-align-${alignment}`} style={{ width }}>
          <img
            src={props.node.attrs.src}
            alt={props.node.attrs.alt}
            className="w-full h-auto rounded-lg"
          />
          <ImageControls
            alignment={alignment}
            onAlignmentChange={handleAlignmentChange}
          />
          <ResizeHandle onResize={handleResize} />
        </div>
      </div>
    </NodeViewWrapper>
  );
}