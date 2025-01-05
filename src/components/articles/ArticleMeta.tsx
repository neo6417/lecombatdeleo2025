import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { useProfile } from '../../hooks/useProfile';

interface ArticleMetaProps {
  authorId: string | null;
  createdAt: string;
  readingTime: string;
}

export function ArticleMeta({ authorId, createdAt, readingTime }: ArticleMetaProps) {
  const { profile } = useProfile();

  return (
    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
      {authorId && (
        <div className="flex items-center">
          <User className="w-4 h-4 mr-2" />
          <span>{profile?.username || 'Auteur inconnu'}</span>
        </div>
      )}
      <div className="flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        <time dateTime={createdAt}>{formatDate(createdAt)}</time>
      </div>
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-2" />
        <span>{readingTime}</span>
      </div>
    </div>
  );
}