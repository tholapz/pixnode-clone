'use client';

import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PhotographerProfile } from './PhotographerProfile';
import type { User, PhotographerProfile as PhotographerProfileType } from '@/types/user';

/**
 * Page component for displaying photographer profile
 */
export default function PhotographerProfilePage(): React.ReactNode {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<PhotographerProfileType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load user and profile data
   */
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        // For demo, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const mockUser: User = {
          id: 'user-1',
          email: 'john.doe@example.com',
          name: 'John Doe',
          role: 'photographer',
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-01'),
        };
        
        // Mock profile data
        const mockProfile: PhotographerProfileType = {
          userId: 'user-1',
          bio: 'Professional photographer with 5 years of experience specializing in portraits and events. I focus on natural light photography and candid moments.',
          specialties: ['Portrait', 'Event', 'Wedding'],
          yearsOfExperience: 5,
          hourlyRate: 100,
          location: 'New York, NY',
          available: true,
          website: 'https://johndoephotography.example.com',
          socialLinks: {
            instagram: 'johndoephoto',
            facebook: 'johndoephotography',
            twitter: 'johndoephoto',
            linkedin: 'johndoe',
          },
        };
        
        setUser(mockUser);
        setProfile(mockProfile);
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  /**
   * Handle profile updates
   */
  const handleUpdateProfile = async (data: Partial<PhotographerProfileType>): Promise<void> => {
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate an update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setProfile(prev => prev ? { ...prev, ...data } : null);
    } catch (err) {
      console.error('Failed to update profile:', err);
      throw new Error('Failed to update profile');
    }
  };

  return (
    <AppLayout currentUser={user}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Photographer Profile</h1>
          <p className="mt-2 text-gray-600">
            {isLoading 
              ? 'Loading profile information...' 
              : 'View and manage your professional profile'}
          </p>
        </div>
        
        <PhotographerProfile
          user={user}
          profile={profile}
          isLoading={isLoading}
          error={error}
          isOwner={true} // In a real app, this would be determined by authentication
          onUpdateProfile={handleUpdateProfile}
        />
        
        {/* Portfolio section would be added here */}
      </div>
    </AppLayout>
  );
}
