'use client';

import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ClientProfile } from './ClientProfile';
import type { User, ClientProfile as ClientProfileType } from '@/types/user';

/**
 * Page component for displaying client profile
 */
export default function ClientProfilePage(): React.ReactNode {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ClientProfileType | null>(null);
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
          id: 'user-2',
          email: 'jane.smith@example.com',
          name: 'Jane Smith',
          role: 'client',
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-01'),
        };
        
        // Mock profile data
        const mockProfile: ClientProfileType = {
          userId: 'user-2',
          companyName: 'Smith Creative Agency',
          industry: 'Advertising',
          description: 'Creative agency specializing in brand identity and marketing campaigns. We work with businesses of all sizes to create compelling visual narratives.',
          location: 'Los Angeles, CA',
          website: 'https://smithcreative.example.com',
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
  const handleUpdateProfile = async (data: Partial<ClientProfileType>): Promise<void> => {
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
          <h1 className="text-3xl font-bold text-gray-900">Client Profile</h1>
          <p className="mt-2 text-gray-600">
            {isLoading 
              ? 'Loading profile information...' 
              : 'View and manage your client profile'}
          </p>
        </div>
        
        <ClientProfile
          user={user}
          profile={profile}
          isLoading={isLoading}
          error={error}
          isOwner={true} // In a real app, this would be determined by authentication
          onUpdateProfile={handleUpdateProfile}
        />
      </div>
    </AppLayout>
  );
}
