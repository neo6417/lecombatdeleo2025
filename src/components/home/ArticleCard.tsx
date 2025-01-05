import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImage, CardContent } from '../ui/Card';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  link?: string;
}

export function ArticleCard({ title, excerpt, imageUrl, link = "#" }: ArticleCardProps) {
  return (
    <Card>
      <CardImage src={imageUrl} alt={title} />
      <CardContent>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600">
          {excerpt}
        </p>
        <Link
          to={link}
          className="mt-4 inline-block text-blue-600 hover:text-blue-800"
        >
          Lire la suite →
        </Link>
      </CardContent>
    </Card>
  );
}