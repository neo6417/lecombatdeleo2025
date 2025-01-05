import React from 'react';
import { Move } from 'lucide-react';

interface ResizeHandleProps {
  onResize: (width: string) => void;
}

export function ResizeHandle({ onResize }: ResizeHandleProps) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = e.currentTarget.parentElement?.getBoundingClientRect().width || 0;

    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - startX;
      const newWidth = Math.max(200, startWidth + diff);
      onResize(`${newWidth}px`);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize hidden group-hover:flex items-center justify-center bg-white rounded-tl shadow"
      onMouseDown={handleMouseDown}
    >
      <Move className="w-4 h-4 text-gray-500" />
    </div>
  );
}