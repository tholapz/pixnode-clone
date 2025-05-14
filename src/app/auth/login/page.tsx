'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import { AppLayout } from '@/components/layout/AppLayout';
import type { LoginFormData } from '@/types/user';

/**
 * Login page component
 * Allows existing users to authenticate
 */
export default function LoginPage(): React.ReactNode {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle form submission for login
   */
  const handleLogin = async (data: LoginFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would connect to an authentication API
      console.log('Login data:', data);
      
      // For demo purposes, simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you'd check the user's role in the response
      // and redirect accordingly
      // For demo, we'll assume photographer role
      router.push('/photographer/profile');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-md mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Log In to Pix Node</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Please enter your credentials
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <LoginForm 
            onSubmit={handleLogin} 
            isLoading={isLoading} 
            error={error || undefined} 
          />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account yet?{' '}
              <Link href="/auth/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
