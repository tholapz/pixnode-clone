import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ClientProfile } from '@/app/client/profile/ClientProfile';
import type { User, ClientProfile as ClientProfileType } from '@/types/user';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('ClientProfile', () => {
  const mockUser: User = {
    id: 'user-2',
    email: 'client@example.com',
    name: 'Jane Smith',
    role: 'client',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  };

  const mockProfile: ClientProfileType = {
    userId: 'user-2',
    companyName: 'Smith Creative Agency',
    industry: 'Advertising',
    description: 'Creative agency specializing in brand identity and marketing campaigns',
    location: 'Los Angeles, CA',
    website: 'https://smithcreative.example.com',
  };

  it('renders loading state when isLoading is true', () => {
    render(<ClientProfile isLoading={true} />);
    
    expect(screen.getByText(/Loading profile/i)).toBeInTheDocument();
  });

  it.skip('renders user profile when loaded', () => {
    render(<ClientProfile user={mockUser} profile={mockProfile} />);
    
    // Check that profile info is displayed
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.companyName as string)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.industry as string)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.description as string)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.location)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.website as string)).toBeInTheDocument();
  });

  it('shows edit profile button for the profile owner', () => {
    render(<ClientProfile user={mockUser} profile={mockProfile} isOwner={true} />);
    
    expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
  });

  it('handles edit mode correctly', async () => {
    const handleUpdate = jest.fn();
    render(
      <ClientProfile 
        user={mockUser} 
        profile={mockProfile} 
        isOwner={true} 
        onUpdateProfile={handleUpdate} 
      />
    );
    
    // Click edit button
    fireEvent.click(screen.getByText(/Edit Profile/i));
    
    // Check that form is displayed
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/industry/i)).toBeInTheDocument();
    
    // Edit a field
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Updated company description' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByText(/Save Profile/i));
    
    // Check that update function was called with updated data
    await waitFor(() => {
      expect(handleUpdate).toHaveBeenCalledWith(expect.objectContaining({
        description: 'Updated company description',
      }));
    });
  });

  it('shows error message when there is an error', () => {
    const errorMessage = 'Failed to load profile';
    render(<ClientProfile error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it.skip('displays only available fields from the profile', () => {
    // Create a profile with some fields missing
    const partialProfile: Partial<ClientProfileType> = {
      userId: 'user-2',
      companyName: undefined,
      location: 'Los Angeles, CA',
    };
    
    render(<ClientProfile user={mockUser} profile={partialProfile as ClientProfileType} />);
    
    // Should show the user name
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    
    // Should show the location
    expect(screen.getByText(partialProfile.location as string)).toBeInTheDocument();
    
    // Company name should not be rendered
    expect(screen.queryByText('Company:')).not.toBeInTheDocument();
  });
});
