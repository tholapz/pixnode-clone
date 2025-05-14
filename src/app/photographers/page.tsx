import React from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';

interface Photographer {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  rate: string;
  bio: string;
  imageUrl: string;
}

// Mock data for photographers
const photographers: Photographer[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    location: 'New York, NY',
    specialties: ['Weddings', 'Portraits', 'Events'],
    rate: '$200/hr',
    bio: 'Professional photographer with 10+ years of experience specializing in wedding photography.',
    imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '2',
    name: 'Jamie Chen',
    location: 'Los Angeles, CA',
    specialties: ['Fashion', 'Commercial', 'Portraits'],
    rate: '$250/hr',
    bio: 'Fashion photographer who has worked with major brands and publications.',
    imageUrl: 'https://images.unsplash.com/photo-1621786030888-6a6bfda446e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '3',
    name: 'Taylor Smith',
    location: 'Chicago, IL',
    specialties: ['Nature', 'Architecture', 'Fine Art'],
    rate: '$175/hr',
    bio: 'Award-winning photographer focusing on urban landscapes and architectural photography.',
    imageUrl: 'https://images.unsplash.com/photo-1542709111240-30727348e2e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '4',
    name: 'Jordan Patel',
    location: 'Miami, FL',
    specialties: ['Events', 'Lifestyle', 'Travel'],
    rate: '$225/hr',
    bio: 'Lifestyle and travel photographer who captures authentic moments around the world.',
    imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '5',
    name: 'Casey Williams',
    location: 'Austin, TX',
    specialties: ['Portraits', 'Family', 'Weddings'],
    rate: '$190/hr',
    bio: 'Photographer specializing in family portraits and special life moments.',
    imageUrl: 'https://images.unsplash.com/photo-1589483232748-537611618143?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '6',
    name: 'Riley Johnson',
    location: 'Seattle, WA',
    specialties: ['Nature', 'Wildlife', 'Landscapes'],
    rate: '$210/hr',
    bio: 'Nature and wildlife photographer with a passion for environmental conservation.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
  },
];

export default function PhotographersPage(): React.ReactNode {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Find Your Perfect Photographer
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Browse our talented community of professional photographers.
            </p>
          </div>
          
          {/* Search and Filter section - placeholder for future functionality */}
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-lg">
              <div className="flex rounded-md shadow-sm">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-3 pl-4 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="Search by location, specialty, or name"
                />
                <button
                  type="button"
                  className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-4 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          
          {/* Photographers Grid */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {photographers.map((photographer) => (
              <div key={photographer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={photographer.imageUrl}
                    alt={`${photographer.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{photographer.name}</h3>
                  <p className="text-sm text-gray-500">{photographer.location}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {photographer.specialties.map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-3">{photographer.bio}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{photographer.rate}</span>
                    <Link 
                      href={`/photographers/${photographer.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
