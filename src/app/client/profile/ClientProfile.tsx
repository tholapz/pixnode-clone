'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ClientProfileForm } from '@/components/client/ClientProfileForm';
import type { User, ClientProfile as ClientProfileType } from '@/types/user';

interface ClientProfileProps {
  user?: User | null;
  profile?: ClientProfileType | null;
  isLoading?: boolean;
  error?: string | null;
  isOwner?: boolean;
  onUpdateProfile?: (data: Partial<ClientProfileType>) => Promise<void>;
}

/**
 * Component for displaying and editing a client's profile
 */
export const ClientProfile: React.FC<ClientProfileProps> = ({
  user,
  profile,
  isLoading = false,
  error = null,
  isOwner = false,
  onUpdateProfile,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  /**
   * Toggle edit mode
   */
  const handleEditToggle = (): void => {
    setIsEditing(prev => !prev);
    setUpdateError(null);
  };

  /**
   * Handle profile update submission
   */
  const handleProfileUpdate = async (data: Partial<ClientProfileType>): Promise<void> => {
    if (!onUpdateProfile) return;
    
    setIsSaving(true);
    setUpdateError(null);
    
    try {
      await onUpdateProfile(data);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setUpdateError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        <p>{error}</p>
      </div>
    );
  }

  // No profile state
  if (!user || !profile) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-4">
        <p>Profile not found. Please create a profile first.</p>
        {isOwner && (
          <button
            onClick={() => router.push('/client/create-profile')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Create Profile
          </button>
        )}
      </div>
    );
  }

  // Edit mode
  if (isEditing && isOwner) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Edit Your Profile</h2>
        
        {updateError && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
            <p>{updateError}</p>
          </div>
        )}
        
        <ClientProfileForm
          initialData={profile}
          onSubmit={handleProfileUpdate}
          isLoading={isSaving}
        />
        
        <button
          onClick={handleEditToggle}
          className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
    );
  }

  // Display mode
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Profile header */}
      <div className="relative bg-blue-600 h-32">
        {/* Background cover could go here */}
      </div>
      
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            {profile.companyName && (
              <p className="text-xl text-gray-800 mt-1">{profile.companyName}</p>
            )}
            <p className="text-gray-600 mt-1">{profile.location}</p>
            
            {profile.industry && (
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  {profile.industry}
                </span>
              </div>
            )}
            
            {profile.description && (
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">About</h2>
                <p className="mt-2 text-gray-600">{profile.description}</p>
              </div>
            )}
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
              
              <div className="mt-4 space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="mt-1 text-sm text-gray-900">{profile.location}</p>
                </div>
                
                {profile.website && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Website</h3>
                    <a 
                      href={profile.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mt-1 text-sm text-blue-600 hover:underline"
                    >
                      {profile.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {isOwner && (
              <div className="mt-4">
                <button
                  onClick={handleEditToggle}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
