import React from 'react';

interface MarkdownLinkProps {
  href?: string;
  children: React.ReactNode;
}

export function MarkdownLink({ href, children }: MarkdownLinkProps) {
  if (!href) return <>{children}</>;

  // Vérifie si le lien est une image
  const isImage = href.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  if (isImage) {
    return (
      <img 
        src={href}
        alt={children as string} 
        className="w-full h-auto object-cover max-h-[600px] rounded-lg my-8" 
        loading="lazy"
      />
    );
  }

  return (
    <a 
      href={href} 
      className="text-blue-600 hover:text-blue-800" 
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}