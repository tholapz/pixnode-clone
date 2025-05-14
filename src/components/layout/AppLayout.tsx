"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from './Header';
import type { User } from '@/types/user';

interface AppLayoutProps {
  children: React.ReactNode;
  currentUser?: User | null;
}

/**
 * Main application layout with consistent header and footer
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ children, currentUser }) => {
  /**
   * Handles user logout action
   */
  const handleLogout = (): void => {
    // This would connect to your auth service to logout the user
    console.log('User logged out');
    
    // In a real implementation, you'd clear the user session and redirect
    // window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Pix Node. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-700">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-700">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-700">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
