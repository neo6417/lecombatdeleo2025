import React from 'react';
import { Link } from 'react-router-dom';
import { ArticleCard } from './ArticleCard';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  link?: string;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Notre Mission",
    excerpt: "Découvrez comment nous soutenons la recherche et l'accompagnement...",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800",
    link: "/projects"
  },
  {
    id: 2,
    title: "Événements à Venir",
    excerpt: "Rejoignez-nous pour nos prochains événements de sensibilisation...",
    imageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800",
    link: "/events"
  },
  {
    id: 3,
    title: "Comment Nous Aider",
    excerpt: "Votre soutien est précieux. Découvrez comment vous pouvez contribuer...",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800",
    link: "/contact"
  },
];

export function FeaturedArticles() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Articles à la Une</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}