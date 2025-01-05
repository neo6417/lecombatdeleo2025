import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { useArticleOrder } from '../../hooks/admin/useArticleOrder';

interface ArticleOrderControlsProps {
  articleId: string;
  currentOrder: number;
  totalArticles: number;
  onOrderChange: () => void;
}

export function ArticleOrderControls({
  articleId,
  currentOrder,
  totalArticles,
  onOrderChange
}: ArticleOrderControlsProps) {
  const { moveArticle, updating } = useArticleOrder();

  const handleMove = async (direction: 'up' | 'down') => {
    const newOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;
    try {
      await moveArticle(articleId, newOrder);
      onOrderChange();
    } catch (error) {
      console.error('Error moving article:', error);
    }
  };

  return (
    <div className="flex gap-1">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => handleMove('up')}
        disabled={updating || currentOrder === 1}
        title="Monter l'article"
      >
        <ArrowUp className="w-4 h-4" />
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => handleMove('down')}
        disabled={updating || currentOrder === totalArticles}
        title="Descendre l'article"
      >
        <ArrowDown className="w-4 h-4" />
      </Button>
    </div>
  );
}