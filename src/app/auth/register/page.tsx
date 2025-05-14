'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { AppLayout } from '@/components/layout/AppLayout';
import type { RegisterFormData } from '@/types/user';

/**
 * Registration page component
 * Allows new users to create an account
 */
export default function RegisterPage(): React.ReactNode {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle form submission for registration
   */
  const handleRegister = async (data: RegisterFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would connect to a registration API
      console.log('Registration data:', data);
      
      // For demo purposes, simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect based on user role
      if (data.role === 'photographer') {
        router.push('/photographer/profile');
      } else {
        router.push('/client/profile');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-md mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-gray-600 mt-2">
            Join Pix Node to connect with photographers or clients
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <RegisterForm 
            onSubmit={handleRegister} 
            isLoading={isLoading} 
            error={error || undefined} 
          />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
