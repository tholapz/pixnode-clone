import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PortfolioGallery } from '@/components/portfolio/PortfolioGallery';
import type { PortfolioItem } from '@/types/user';

describe('PortfolioGallery', () => {
  const mockPortfolioItems: PortfolioItem[] = [
    {
      id: '1',
      photographerId: 'photo-1',
      title: 'Wedding Shoot',
      description: 'Smith & Johnson Wedding',
      imageUrl: 'https://example.com/wedding.jpg',
      tags: ['Wedding', 'Outdoor'],
      date: new Date('2025-01-15'),
      featured: true
    },
    {
      id: '2',
      photographerId: 'photo-1',
      title: 'Corporate Headshots',
      description: 'Acme Inc Team Photos',
      imageUrl: 'https://example.com/corporate.jpg',
      tags: ['Corporate', 'Studio', 'Headshot'],
      date: new Date('2025-02-20'),
      featured: false
    },
    {
      id: '3',
      photographerId: 'photo-1',
      title: 'Fashion Editorial',
      description: 'Summer Collection',
      imageUrl: 'https://example.com/fashion.jpg',
      tags: ['Fashion', 'Editorial', 'Summer'],
      date: new Date('2025-03-10'),
      featured: true
    }
  ];

  it('renders empty state when no items are provided', () => {
    render(<PortfolioGallery items={[]} />);
    
    expect(screen.getByText(/no portfolio items/i)).toBeInTheDocument();
  });

  it('renders all portfolio items', () => {
    render(<PortfolioGallery items={mockPortfolioItems} />);
    
    // Check that all items are rendered
    expect(screen.getByText('Wedding Shoot')).toBeInTheDocument();
    expect(screen.getByText('Corporate Headshots')).toBeInTheDocument();
    expect(screen.getByText('Fashion Editorial')).toBeInTheDocument();
    
    // Check for descriptions
    expect(screen.getByText('Smith & Johnson Wedding')).toBeInTheDocument();
    expect(screen.getByText('Acme Inc Team Photos')).toBeInTheDocument();
    expect(screen.getByText('Summer Collection')).toBeInTheDocument();
    
    // Check for images (alt text)
    expect(screen.getByAltText('Wedding Shoot')).toBeInTheDocument();
    expect(screen.getByAltText('Corporate Headshots')).toBeInTheDocument();
    expect(screen.getByAltText('Fashion Editorial')).toBeInTheDocument();
  });

  it('displays featured label on featured items', () => {
    render(<PortfolioGallery items={mockPortfolioItems} />);
    
    // Count the number of featured badges
    const featuredBadges = screen.getAllByText(/featured/i);
    expect(featuredBadges).toHaveLength(2);
  });

  it.skip('filters items by tag when a tag is clicked', () => {
    render(<PortfolioGallery items={mockPortfolioItems} />);
    
    // Find and click on a tag
    const weddingTag = screen.getByText('Wedding');
    fireEvent.click(weddingTag);
    
    // Only the wedding item should be visible
    expect(screen.getByText('Wedding Shoot')).toBeInTheDocument();
    expect(screen.queryByText('Corporate Headshots')).not.toBeInTheDocument();
    expect(screen.queryByText('Fashion Editorial')).not.toBeInTheDocument();
  });

  it('shows date in the expected format', () => {
    render(<PortfolioGallery items={mockPortfolioItems} />);
    
    // Check that dates are formatted correctly
    expect(screen.getByText('Jan 15, 2025')).toBeInTheDocument();
    expect(screen.getByText('Feb 20, 2025')).toBeInTheDocument();
    expect(screen.getByText('Mar 10, 2025')).toBeInTheDocument();
  });

  it.skip('calls onItemClick when an item is clicked', () => {
    const handleItemClick = jest.fn();
    render(<PortfolioGallery items={mockPortfolioItems} onItemClick={handleItemClick} />);
    
    // Click on an item
    const firstItem = screen.getByText('Wedding Shoot').closest('div');
    if (firstItem) {
      fireEvent.click(firstItem);
      expect(handleItemClick).toHaveBeenCalledWith(mockPortfolioItems[0]);
    }
  });

  it.skip('provides a clear filter button when filtering is active', () => {
    render(<PortfolioGallery items={mockPortfolioItems} />);
    
    // Initially, no clear filter button
    expect(screen.queryByText(/clear filter/i)).not.toBeInTheDocument();
    
    // Click on a tag to filter
    const fashionTag = screen.getByText('Fashion');
    fireEvent.click(fashionTag);
    
    // Clear filter button should appear
    const clearButton = screen.getByText(/clear filter/i);
    expect(clearButton).toBeInTheDocument();
    
    // Clicking clear button should show all items again
    fireEvent.click(clearButton);
    
    // All items should be visible
    expect(screen.getByText('Wedding Shoot')).toBeInTheDocument();
    expect(screen.getByText('Corporate Headshots')).toBeInTheDocument();
    expect(screen.getByText('Fashion Editorial')).toBeInTheDocument();
  });
});
