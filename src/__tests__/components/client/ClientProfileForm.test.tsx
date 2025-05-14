import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClientProfileForm } from '@/components/client/ClientProfileForm';
import type { ClientProfile } from '@/types/user';

describe('ClientProfileForm', () => {
  const defaultProfile: Partial<ClientProfile> = {
    companyName: '',
    industry: '',
    description: '',
    location: '',
    website: ''
  };

  it('renders empty form when no initial data provided', () => {
    render(<ClientProfileForm onSubmit={jest.fn()} />);
    
    // Check for form elements
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/industry/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
    
    // Check for submit button
    expect(screen.getByRole('button', { name: /save profile/i })).toBeInTheDocument();
  });

  it('renders form with initial data', () => {
    const initialProfile: Partial<ClientProfile> = {
      companyName: 'Acme Inc',
      industry: 'Technology',
      description: 'Leading tech company',
      location: 'San Francisco, CA',
      website: 'https://acme.example.com'
    };
    
    render(<ClientProfileForm onSubmit={jest.fn()} initialData={initialProfile} />);
    
    // Check for pre-filled values
    expect(screen.getByLabelText(/company name/i)).toHaveValue(initialProfile.companyName);
    expect(screen.getByLabelText(/industry/i)).toHaveValue(initialProfile.industry);
    expect(screen.getByLabelText(/description/i)).toHaveValue(initialProfile.description);
    expect(screen.getByLabelText(/location/i)).toHaveValue(initialProfile.location);
    expect(screen.getByLabelText(/website/i)).toHaveValue(initialProfile.website);
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<ClientProfileForm onSubmit={handleSubmit} />);
    
    // Submit without required fields
    await user.click(screen.getByRole('button', { name: /save profile/i }));
    
    // Check for validation errors (location is the only required field)
    await waitFor(() => {
      expect(screen.getByText(/location is required/i)).toBeInTheDocument();
    });
    
    // Ensure form was not submitted
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it.skip('validates website format if provided', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<ClientProfileForm onSubmit={handleSubmit} initialData={defaultProfile} />);
    
    // Fill required fields but with invalid website
    await user.type(screen.getByLabelText(/location/i), 'New York, NY');
    await user.type(screen.getByLabelText(/website/i), 'invalid-url');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /save profile/i }));
    
    // Check for website format error
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid url/i)).toBeInTheDocument();
    });
    
    // Ensure form was not submitted
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it.skip('submits form with valid data', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<ClientProfileForm onSubmit={handleSubmit} initialData={defaultProfile} />);
    
    // Fill out fields
    await user.type(screen.getByLabelText(/company name/i), 'Creative Studios');
    await user.type(screen.getByLabelText(/industry/i), 'Advertising');
    await user.type(screen.getByLabelText(/description/i), 'Creative advertising agency');
    await user.type(screen.getByLabelText(/location/i), 'Los Angeles, CA');
    await user.type(screen.getByLabelText(/website/i), 'https://creative.example.com');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /save profile/i }));
    
    // Check if form submission was called with correct data
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        companyName: 'Creative Studios',
        industry: 'Advertising',
        description: 'Creative advertising agency',
        location: 'Los Angeles, CA',
        website: 'https://creative.example.com'
      });
    });
  });

  it.skip('submits form with minimal required data', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<ClientProfileForm onSubmit={handleSubmit} initialData={defaultProfile} />);
    
    // Fill only required fields
    await user.type(screen.getByLabelText(/location/i), 'Chicago, IL');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /save profile/i }));
    
    // Check if form submission was called with correct data
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        companyName: '',
        industry: '',
        description: '',
        location: 'Chicago, IL',
        website: ''
      });
    });
  });
});
