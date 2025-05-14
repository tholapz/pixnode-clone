import React, { useState } from 'react';
import type { PortfolioItem } from '@/types/user';

/**
 * Props for PortfolioGallery component
 */
interface PortfolioGalleryProps {
  items: PortfolioItem[];
  onItemClick?: (item: PortfolioItem) => void;
}

/**
 * Gallery to display photographer's portfolio items
 */
export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  items,
  onItemClick,
}) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  /**
   * Format date for display
   */
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  /**
   * Get all unique tags from all portfolio items
   */
  const allTags = Array.from(
    new Set(items.flatMap(item => item.tags))
  ).sort();

  /**
   * Filter items based on active tag
   */
  const filteredItems = activeTag
    ? items.filter(item => item.tags.includes(activeTag))
    : items;

  /**
   * Handle tag click to filter items
   */
  const handleTagClick = (tag: string) => {
    setActiveTag(tag === activeTag ? null : tag);
  };

  /**
   * Clear active tag filter
   */
  const clearFilter = () => {
    setActiveTag(null);
  };

  /**
   * Handle portfolio item click
   */
  const handleItemClick = (item: PortfolioItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  // If there are no items, show an empty state
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg p-8">
        <h3 className="text-xl font-medium text-gray-700">No portfolio items</h3>
        <p className="text-gray-500 mt-2">Add items to your portfolio to showcase your work.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tags filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                activeTag === tag
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
          
          {activeTag && (
            <button
              onClick={clearFilter}
              className="px-3 py-1 rounded-full text-sm font-medium text-red-600 hover:text-red-800"
            >
              Clear Filter
            </button>
          )}
        </div>
      )}

      {/* Portfolio items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          >
            <div className="relative h-48">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.featured && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                  Featured
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-lg">{item.title}</h3>
              
              {item.description && (
                <p className="text-gray-600 mt-1 line-clamp-2">{item.description}</p>
              )}
              
              <div className="flex justify-between items-center mt-3">
                <div className="text-sm text-gray-500">
                  {formatDate(item.date)}
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="inline-block text-gray-500 text-xs">
                      +{item.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
