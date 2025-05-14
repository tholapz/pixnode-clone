import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';

export default function AboutPage(): React.ReactNode {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              About Pix Node
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Connecting photographers with clients since 2023.
            </p>
          </div>
          <div className="mt-12 prose prose-blue prose-lg text-gray-500 mx-auto">
            <h2>Our Mission</h2>
            <p>
              Pix Node was created with a simple mission: to make it easier for talented photographers 
              to showcase their work and connect with clients looking for professional photography services.
            </p>
            
            <h2>What We Offer</h2>
            <p>
              For photographers, we provide a platform to build a stunning portfolio, set your rates, 
              and connect with clients looking for your unique style and expertise.
            </p>
            <p>
              For clients, we offer an easy way to browse photographers by location, specialty, and price range,
              making it simple to find the perfect photographer for any event or project.
            </p>
            
            <h2>Our Team</h2>
            <p>
              Pix Node was founded by a group of photographers and tech enthusiasts who understood 
              the challenges of connecting talent with opportunity in the photography industry.
            </p>
            <p>
              Our diverse team is passionate about photography, technology, and creating a platform 
              that serves both photographers and clients with equal attention to their needs.
            </p>
            
            <h2>Join Our Community</h2>
            <p>
              Whether you're a professional photographer looking to grow your client base or someone 
              in need of photography services, we invite you to join our growing community.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/register"
                className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign Up Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
