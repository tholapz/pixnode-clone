"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';

/**
 * Form data structure for password recovery
 */
interface ForgotPasswordFormData {
  email: string;
}

/**
 * Form submission state
 */
type FormState = 'initial' | 'submitting' | 'success' | 'error';

/**
 * Password Recovery page component
 * Allows users to request a password reset link
 */
export default function ForgotPasswordPage(): React.ReactNode {
  // Initialize form state
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  });
  
  const [formState, setFormState] = useState<FormState>('initial');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  /**
   * Handles form input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset error state when making changes
    if (formState === 'error') {
      setFormState('initial');
      setErrorMessage('');
    }
  };
  
  /**
   * Validates the form data
   * @returns True if valid, false otherwise
   */
  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    } 
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    
    return true;
  };
  
  /**
   * Handles form submission
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (validateForm()) {
      setFormState('submitting');
      
      // Simulate API call to request password reset
      setTimeout(() => {
        console.log('Password reset requested for:', formData.email);
        // In a real application, this would send a request to your backend 
        // to generate a reset token and send an email to the user
        
        setFormState('success');
      }, 1500);
    } else {
      setFormState('error');
    }
  };
  
  /**
   * Renders the appropriate content based on form state
   */
  const renderContent = (): React.ReactNode => {
    switch (formState) {
      case 'success':
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-3 text-lg font-medium text-gray-900">Password Reset Email Sent</h2>
            <p className="mt-2 text-sm text-gray-500">
              We've sent a password reset link to <span className="font-medium">{formData.email}</span>.
              Please check your email and follow the instructions to reset your password.
            </p>
            <div className="mt-6">
              <Link
                href="/login"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Return to login
              </Link>
            </div>
          </div>
        );
        
      default:
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formState === 'error' ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter your email address"
                disabled={formState === 'submitting'}
              />
              {formState === 'error' && (
                <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
              )}
            </div>
            
            <div className="mt-2 text-sm text-gray-500">
              Enter the email address associated with your account, and we'll send you a link to reset your password.
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={formState === 'submitting'}
                className={`w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  formState === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {formState === 'submitting' ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  Back to login
                </Link>
              </div>
              <div className="text-sm">
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        );
    }
  };
  
  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Forgot Your Password?</h1>
          <p className="mt-2 text-lg text-gray-600">
            No worries, we'll help you reset it
          </p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
          {renderContent()}
        </div>
      </div>
    </AppLayout>
  );
}
