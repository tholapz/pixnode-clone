import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';

/**
 * Privacy Policy page component
 * Displays the site's privacy policy information
 */
export default function PrivacyPage(): React.ReactNode {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <div className="prose prose-blue max-w-none">
          <h2>1. Introduction</h2>
          <p>
            At Pix Node, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          
          <h2>2. Information We Collect</h2>
          <p>
            We may collect information about you in various ways, including:
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Name, email address, phone number, and other contact details 
              you provide when creating an account or contacting us.
            </li>
            <li>
              <strong>Profile Information:</strong> For photographers, we collect portfolio images, 
              service descriptions, pricing, and professional background information.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact with our platform, 
              including access times, pages viewed, and the referring website address.
            </li>
            <li>
              <strong>Device Information:</strong> Information about your device, IP address, 
              browser type, and operating system.
            </li>
          </ul>
          
          <h2>3. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Create and manage your account</li>
            <li>Connect photographers with potential clients</li>
            <li>Process payments and transactions</li>
            <li>Improve our platform and services</li>
            <li>Communicate with you about updates and offers</li>
            <li>Monitor and analyze usage patterns</li>
            <li>Protect against unauthorized access and fraud</li>
          </ul>
          
          <h2>4. Sharing Your Information</h2>
          <p>
            We may share your information with:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> Third-party vendors who help us operate our website 
              and conduct our business.
            </li>
            <li>
              <strong>Platform Users:</strong> When photographers and clients connect, certain profile 
              information is shared to facilitate bookings.
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or to protect our rights.
            </li>
          </ul>
          
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal 
            information from unauthorized access, loss, or alteration. However, no method of 
            transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
          
          <h2>6. Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal data, including:
          </p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your information</li>
            <li>Objection to processing of your information</li>
            <li>Data portability</li>
          </ul>
          
          <h2>7. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience on our website. 
            You can set your browser to refuse cookies, but some parts of our website may not function properly.
          </p>
          
          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any changes by 
            posting the new policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2>9. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p className="ml-4">
            Email: privacy@pixnode.com<br />
            Address: 123 Photography Lane, San Francisco, CA 94103
          </p>
          
          <p className="mt-8 text-sm text-gray-600">Last Updated: May 14, 2025</p>
        </div>
      </div>
    </AppLayout>
  );
}
