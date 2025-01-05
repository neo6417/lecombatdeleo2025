import React from 'react';
import { Search } from 'lucide-react';

interface ArticleFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function ArticleFilter({ searchTerm, onSearchChange }: ArticleFilterProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Rechercher un article..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
}