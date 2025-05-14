'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PhotographerProfileForm } from '@/components/photographer/PhotographerProfileForm';
import type { User, PhotographerProfile as PhotographerProfileType } from '@/types/user';

interface PhotographerProfileProps {
  user?: User | null;
  profile?: PhotographerProfileType | null;
  isLoading?: boolean;
  error?: string | null;
  isOwner?: boolean;
  onUpdateProfile?: (data: Partial<PhotographerProfileType>) => Promise<void>;
}

/**
 * Component for displaying and editing a photographer's profile
 */
export const PhotographerProfile: React.FC<PhotographerProfileProps> = ({
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
  const handleProfileUpdate = async (data: Partial<PhotographerProfileType>): Promise<void> => {
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
            onClick={() => router.push('/photographer/create-profile')}
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
        
        <PhotographerProfileForm
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
        {profile.available ? (
          <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
            Available for hire
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
            Not available for hire
          </div>
        )}
      </div>
      
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 mt-1">{profile.location}</p>
            
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">About</h2>
              <p className="mt-2 text-gray-600">{profile.bio}</p>
            </div>
            
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Specialties</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.specialties.map(specialty => (
                  <span 
                    key={specialty} 
                    className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900">Details</h2>
              
              <div className="mt-4 space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                  <p className="mt-1 text-sm text-gray-900">{profile.yearsOfExperience} years of experience</p>
                </div>
                
                {profile.hourlyRate && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Rate</h3>
                    <p className="mt-1 text-sm text-gray-900">${profile.hourlyRate}/hr</p>
                  </div>
                )}
                
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
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                  <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">Social</h3>
                <div className="mt-2 flex space-x-4">
                  {profile.socialLinks.instagram && (
                    <a 
                      href={`https://instagram.com/${profile.socialLinks.instagram}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-gray-900"
                      aria-label="Instagram"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  
                  {profile.socialLinks.facebook && (
                    <a 
                      href={`https://facebook.com/${profile.socialLinks.facebook}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-gray-900"
                      aria-label="Facebook"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  
                  {profile.socialLinks.twitter && (
                    <a 
                      href={`https://twitter.com/${profile.socialLinks.twitter}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-gray-900"
                      aria-label="Twitter"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  
                  {profile.socialLinks.linkedin && (
                    <a 
                      href={`https://linkedin.com/in/${profile.socialLinks.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-gray-900"
                      aria-label="LinkedIn"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                </div>
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
