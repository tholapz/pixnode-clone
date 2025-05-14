import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhotographerProfileForm } from '@/components/photographer/PhotographerProfileForm';
import type { PhotographerProfile } from '@/types/user';

describe('PhotographerProfileForm', () => {
  const defaultProfile: Partial<PhotographerProfile> = {
    bio: '',
    specialties: [],
    yearsOfExperience: 0,
    location: '',
    available: true,
    socialLinks: {}
  };

  it('renders empty form when no initial data provided', () => {
    render(<PhotographerProfileForm onSubmit={jest.fn()} />);
    
    // Check for form elements
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/specialties/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/years of experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hourly rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/available for hire/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/instagram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/facebook/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/twitter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument();
    
    // Check for submit button
    expect(screen.getByRole('button', { name: /save profile/i })).toBeInTheDocument();
  });

  it('renders form with initial data', () => {
    const initialProfile: Partial<PhotographerProfile> = {
      bio: 'Professional photographer with 5 years of experience',
      specialties: ['Portrait', 'Wedding'],
      yearsOfExperience: 5,
      hourlyRate: 100,
      location: 'New York, NY',
      available: true,
      website: 'https://example.com',
      socialLinks: {
        instagram: 'photographer',
        facebook: 'photographer',
        twitter: 'photographer',
        linkedin: 'photographer'
      }
    };
    
    render(<PhotographerProfileForm onSubmit={jest.fn()} initialData={initialProfile} />);
    
    // Check for pre-filled values
    expect(screen.getByLabelText(/bio/i)).toHaveValue(initialProfile.bio);
    expect(screen.getByLabelText(/years of experience/i)).toHaveValue(initialProfile.yearsOfExperience);
    expect(screen.getByLabelText(/hourly rate/i)).toHaveValue(initialProfile.hourlyRate);
    expect(screen.getByLabelText(/location/i)).toHaveValue(initialProfile.location);
    expect(screen.getByLabelText(/available for hire/i)).toBeChecked();
    expect(screen.getByLabelText(/website/i)).toHaveValue(initialProfile.website);
    expect(screen.getByLabelText(/instagram/i)).toHaveValue(initialProfile.socialLinks.instagram);
    expect(screen.getByLabelText(/facebook/i)).toHaveValue(initialProfile.socialLinks.facebook);
    expect(screen.getByLabelText(/twitter/i)).toHaveValue(initialProfile.socialLinks.twitter);
    expect(screen.getByLabelText(/linkedin/i)).toHaveValue(initialProfile.socialLinks.linkedin);
  });

  it.skip('validates required fields', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<PhotographerProfileForm onSubmit={handleSubmit} />);
    
    // Submit without required fields
    await user.click(screen.getByRole('button', { name: /save profile/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/bio is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please select at least one specialty/i)).toBeInTheDocument();
      expect(screen.getByText(/location is required/i)).toBeInTheDocument();
    });
    
    // Ensure form was not submitted
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it.skip('submits form with valid data', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<PhotographerProfileForm onSubmit={handleSubmit} initialData={defaultProfile} />);
    
    // Fill out required fields
    await user.type(screen.getByLabelText(/bio/i), 'Professional photographer specializing in portraits');
    await user.type(screen.getByLabelText(/specialties/i), 'Portrait, Event');
    await user.clear(screen.getByLabelText(/years of experience/i));
    await user.type(screen.getByLabelText(/years of experience/i), '3');
    await user.type(screen.getByLabelText(/hourly rate/i), '75');
    await user.type(screen.getByLabelText(/location/i), 'San Francisco, CA');
    await user.type(screen.getByLabelText(/website/i), 'https://myportfolio.com');
    await user.type(screen.getByLabelText(/instagram/i), 'photo_pro');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /save profile/i }));
    
    // Check if form submission was called with correct data
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        bio: 'Professional photographer specializing in portraits',
        specialties: ['Portrait', 'Event'],
        yearsOfExperience: 3,
        hourlyRate: 75,
        location: 'San Francisco, CA',
        available: true,
        website: 'https://myportfolio.com',
        socialLinks: {
          instagram: 'photo_pro',
          facebook: '',
          twitter: '',
          linkedin: ''
        }
      });
    });
  });

  it('handles toggle for availability', async () => {
    const user = userEvent.setup();
    const initialProfile: Partial<PhotographerProfile> = {
      ...defaultProfile,
      available: true
    };
    
    render(<PhotographerProfileForm onSubmit={jest.fn()} initialData={initialProfile} />);
    
    // Initially checked
    expect(screen.getByLabelText(/available for hire/i)).toBeChecked();
    
    // Toggle availability
    await user.click(screen.getByLabelText(/available for hire/i));
    
    // Should be unchecked now
    expect(screen.getByLabelText(/available for hire/i)).not.toBeChecked();
  });
});
