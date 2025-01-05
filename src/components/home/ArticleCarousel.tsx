import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useArticles } from '../../hooks/useArticles';
import { CarouselIndicators } from './CarouselIndicators';
import { useSwipe } from '../../hooks/useSwipe';
import { formatDate } from '../../utils/formatDate';

export function ArticleCarousel() {
  const { articles, loading } = useArticles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const featuredArticles = articles.filter(article => article.status === 'published').slice(0, 5);

  const nextSlide = useCallback(() => {
    if (!featuredArticles.length || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((current) => 
      current === featuredArticles.length - 1 ? 0 : current + 1
    );
    
    setTimeout(() => setIsTransitioning(false), 500);
  }, [featuredArticles.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!featuredArticles.length || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((current) => 
      current === 0 ? featuredArticles.length - 1 : current - 1
    );
    
    setTimeout(() => setIsTransitioning(false), 500);
  }, [featuredArticles.length, isTransitioning]);

  const { touchHandlers } = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide
  });

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isAutoPlaying]);

  if (loading) {
    return (
      <div className="h-[600px] bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Chargement...</div>
      </div>
    );
  }

  if (!featuredArticles.length) return null;

  return (
    <div 
      className="relative h-[600px] overflow-hidden group bg-gray-900"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      {...touchHandlers}
    >
      <div className="h-full relative">
        {featuredArticles.map((article, index) => (
          <div
            key={article.id}
            className={`absolute w-full h-full transition-all duration-500 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 translate-x-full scale-95'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={article.featured_image || 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=2000'}
              alt={article.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-4 text-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 transform transition-all duration-500 delay-100">
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto transform transition-all duration-500 delay-200">
                    {article.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-center gap-4 text-sm mb-8 transform transition-all duration-500 delay-300">
                  <time dateTime={article.created_at} className="text-gray-200">
                    {formatDate(article.created_at)}
                  </time>
                </div>
                <Link
                  to={`/articles/${article.slug}`}
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors transform transition-all duration-500 delay-400"
                >
                  Lire l'article
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
        aria-label="Image précédente"
        disabled={isTransitioning}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
        aria-label="Image suivante"
        disabled={isTransitioning}
      >
        <ChevronRight size={24} />
      </button>

      <CarouselIndicators
        total={featuredArticles.length}
        current={currentIndex}
        onChange={setCurrentIndex}
      />
    </div>
  );
}