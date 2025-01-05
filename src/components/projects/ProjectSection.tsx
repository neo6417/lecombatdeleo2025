import React from 'react';

interface ProjectSectionProps {
  title: string;
  content: string;
  image?: string;
}

export function ProjectSection({ title, content, image }: ProjectSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="prose max-w-none">
          {content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover rounded-lg mt-4"
          />
        )}
      </div>
    </div>
  );
}