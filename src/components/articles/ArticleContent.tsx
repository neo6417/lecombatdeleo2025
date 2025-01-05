import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownImage } from '../markdown/MarkdownImage';
import { MarkdownLink } from '../markdown/MarkdownLink';
import DOMPurify from 'dompurify';

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  // Vérifie si le contenu est du HTML
  const isHTML = /<[a-z][\s\S]*>/i.test(content);

  if (isHTML) {
    // Nettoie et rend le HTML de manière sécurisée
    const cleanHTML = DOMPurify.sanitize(content);
    return (
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      />
    );
  }

  // Sinon, traite comme du Markdown
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          img: MarkdownImage,
          a: MarkdownLink,
          p: ({ children, ...props }) => {
            const containsOnlyImage = React.Children.toArray(children).every(
              child => React.isValidElement(child) && child.type === MarkdownImage
            );
            return containsOnlyImage ? <>{children}</> : <p {...props}>{children}</p>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}