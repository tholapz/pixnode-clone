import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Contact page component
 * Provides a form for users to contact the Pix Node team
 */
export default function ContactPage(): React.ReactNode {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg text-gray-600 mb-4">
              Have questions or need help with your Pix Node account? We're here to assist you.
            </p>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Office</h2>
              <address className="not-italic text-gray-600">
                <p>123 Photography Lane</p>
                <p>San Francisco, CA 94103</p>
                <p>United States</p>
              </address>
              
              <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Email Us</h2>
              <p className="text-gray-600">
                General Inquiries: <a href="mailto:info@pixnode.com" className="text-blue-600 hover:text-blue-800">info@pixnode.com</a>
              </p>
              <p className="text-gray-600">
                Support: <a href="mailto:support@pixnode.com" className="text-blue-600 hover:text-blue-800">support@pixnode.com</a>
              </p>
              <p className="text-gray-600">
                Partnerships: <a href="mailto:partners@pixnode.com" className="text-blue-600 hover:text-blue-800">partners@pixnode.com</a>
              </p>
              
              <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Business Hours</h2>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
              <p className="text-gray-600">Saturday - Sunday: Closed</p>
            </div>
          </div>
          
          <div>
            <form className="bg-white shadow-md rounded-lg p-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
