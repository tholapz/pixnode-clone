import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PhotographerProfile } from '@/app/photographer/profile/PhotographerProfile';
import type { User, PhotographerProfile as PhotographerProfileType } from '@/types/user';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('PhotographerProfile', () => {
  const mockUser: User = {
    id: 'user-1',
    email: 'photographer@example.com',
    name: 'John Doe',
    role: 'photographer',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  };

  const mockProfile: PhotographerProfileType = {
    userId: 'user-1',
    bio: 'Professional photographer with 5 years of experience',
    specialties: ['Portrait', 'Wedding', 'Commercial'],
    yearsOfExperience: 5,
    hourlyRate: 100,
    location: 'New York, NY',
    available: true,
    website: 'https://example.com',
    socialLinks: {
      instagram: 'johndoe',
      facebook: 'johndoephoto',
      twitter: 'johndoephoto',
      linkedin: 'johndoe',
    },
  };

  it('renders loading state when isLoading is true', () => {
    render(<PhotographerProfile isLoading={true} />);
    
    expect(screen.getByText(/Loading profile/i)).toBeInTheDocument();
  });

  it('renders user profile when loaded', () => {
    render(<PhotographerProfile user={mockUser} profile={mockProfile} />);
    
    // Check that profile info is displayed
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.bio)).toBeInTheDocument();
    expect(screen.getByText(/Portrait/i)).toBeInTheDocument();
    expect(screen.getByText(/Wedding/i)).toBeInTheDocument();
    expect(screen.getByText(/Commercial/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockProfile.yearsOfExperience} years of experience`)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProfile.hourlyRate}/hr`)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.location)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.website as string)).toBeInTheDocument();
  });

  it('shows available status when photographer is available', () => {
    render(<PhotographerProfile user={mockUser} profile={mockProfile} />);
    
    expect(screen.getByText(/Available for hire/i)).toBeInTheDocument();
  });

  it('shows unavailable status when photographer is not available', () => {
    const unavailableProfile = { ...mockProfile, available: false };
    render(<PhotographerProfile user={mockUser} profile={unavailableProfile} />);
    
    expect(screen.getByText(/Not available for hire/i)).toBeInTheDocument();
  });

  it('shows edit profile button for the profile owner', () => {
    render(<PhotographerProfile user={mockUser} profile={mockProfile} isOwner={true} />);
    
    expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
  });

  it('handles edit mode correctly', async () => {
    const handleUpdate = jest.fn();
    render(
      <PhotographerProfile 
        user={mockUser} 
        profile={mockProfile} 
        isOwner={true} 
        onUpdateProfile={handleUpdate} 
      />
    );
    
    // Click edit button
    fireEvent.click(screen.getByText(/Edit Profile/i));
    
    // Check that form is displayed
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/specialties/i)).toBeInTheDocument();
    
    // Edit a field
    fireEvent.change(screen.getByLabelText(/bio/i), {
      target: { value: 'Updated bio content' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByText(/Save Profile/i));
    
    // Check that update function was called with updated data
    await waitFor(() => {
      expect(handleUpdate).toHaveBeenCalledWith(expect.objectContaining({
        bio: 'Updated bio content',
      }));
    });
  });

  it('shows error message when there is an error', () => {
    const errorMessage = 'Failed to load profile';
    render(<PhotographerProfile error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
