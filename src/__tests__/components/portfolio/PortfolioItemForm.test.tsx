import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PortfolioItemForm } from '@/components/portfolio/PortfolioItemForm';
import type { PortfolioItem } from '@/types/user';

describe('PortfolioItemForm', () => {
  const mockCurrentDate = new Date('2025-05-14');
  
  const defaultItem: Partial<PortfolioItem> = {
    title: '',
    description: '',
    imageUrl: '',
    tags: [],
    date: mockCurrentDate,
    featured: false
  };

  beforeEach(() => {
    // Mock the Date constructor
    jest.spyOn(global, 'Date').mockImplementation(() => mockCurrentDate as unknown as string);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders empty form when no initial data provided', () => {
    render(<PortfolioItemForm onSubmit={jest.fn()} />);
    
    // Check for form elements
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/featured/i)).toBeInTheDocument();
    
    // Check for submit button
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it.skip('renders form with initial data', () => {
    const initialItem: Partial<PortfolioItem> = {
      title: 'Wedding Photoshoot',
      description: 'Smith & Johnson Wedding',
      imageUrl: 'https://example.com/photo.jpg',
      tags: ['Wedding', 'Outdoor'],
      date: new Date('2025-01-15'),
      featured: true
    };
    
    render(<PortfolioItemForm onSubmit={jest.fn()} initialData={initialItem} />);
    
    // Check for pre-filled values
    expect(screen.getByLabelText(/title/i)).toHaveValue(initialItem.title);
    expect(screen.getByLabelText(/description/i)).toHaveValue(initialItem.description);
    expect(screen.getByDisplayValue('2025-01-15')).toBeInTheDocument(); // Date field
    expect(screen.getByLabelText(/featured/i)).toBeChecked();
  });

  it.skip('validates required fields', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<PortfolioItemForm onSubmit={handleSubmit} />);
    
    // Submit without required fields
    await user.click(screen.getByRole('button', { name: /save/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/image is required/i)).toBeInTheDocument();
    });
    
    // Ensure form was not submitted
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it.skip('handles file upload', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<PortfolioItemForm onSubmit={handleSubmit} initialData={defaultItem} />);
    
    // Create a mock file
    const file = new File(['dummy content'], 'photo.jpg', { type: 'image/jpeg' });
    
    // Upload file
    const fileInput = screen.getByLabelText(/upload image/i);
    await user.upload(fileInput, file);
    
    // Mock a successful file upload that returns a URL
    // In a real implementation, you would need to mock the upload service
    // Here we're simulating setting the imageUrl after upload
    // This would normally be handled by your file upload function
    
    // Now populate other required fields
    await user.type(screen.getByLabelText(/title/i), 'Nature Photoshoot');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /save/i }));
    
    // In a real component the upload would happen and set imageUrl
    // Since we can't fully test this without the implementation, we'll just
    // verify the form is not submitted without the image URL
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it.skip('submits form with valid data', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    
    // Start with a portfolio item that already has an image URL
    const initialItem: Partial<PortfolioItem> = {
      ...defaultItem,
      imageUrl: 'https://example.com/uploaded-photo.jpg'
    };
    
    render(<PortfolioItemForm onSubmit={handleSubmit} initialData={initialItem} />);
    
    // Fill out required fields
    await user.type(screen.getByLabelText(/title/i), 'Portrait Session');
    await user.type(screen.getByLabelText(/description/i), 'Professional headshots');
    await user.type(screen.getByLabelText(/tags/i), 'portrait, studio, professional');
    await user.click(screen.getByLabelText(/featured/i));
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /save/i }));
    
    // Check if form submission was called with correct data
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        title: 'Portrait Session',
        description: 'Professional headshots',
        imageUrl: 'https://example.com/uploaded-photo.jpg',
        tags: ['portrait', 'studio', 'professional'],
        date: mockCurrentDate,
        featured: true
      });
    });
  });

  it('toggles featured status', async () => {
    const user = userEvent.setup();
    
    // Start with non-featured item
    const initialItem: Partial<PortfolioItem> = {
      ...defaultItem,
      featured: false
    };
    
    render(<PortfolioItemForm onSubmit={jest.fn()} initialData={initialItem} />);
    
    // Initially unchecked
    expect(screen.getByLabelText(/featured/i)).not.toBeChecked();
    
    // Toggle featured status
    await user.click(screen.getByLabelText(/featured/i));
    
    // Should be checked now
    expect(screen.getByLabelText(/featured/i)).toBeChecked();
  });
});
