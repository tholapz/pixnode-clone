import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';

/**
 * Terms of Service page component
 * Displays the site's terms and conditions
 */
export default function TermsPage(): React.ReactNode {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        
        <div className="prose prose-blue max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Pix Node, you agree to be bound by these Terms of Service. 
            If you do not agree to all the terms and conditions, you may not access or use our services.
          </p>
          
          <h2>2. Description of Service</h2>
          <p>
            Pix Node is a platform that connects photographers with clients seeking photography services. 
            We provide tools for photographers to showcase their work and for clients to find and contact photographers.
          </p>
          
          <h2>3. User Accounts</h2>
          <p>
            To use certain features of our service, you must register for an account. You agree to provide 
            accurate, current, and complete information during the registration process and to update such 
            information to keep it accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding your password and for all activities that occur under your account. 
            You agree to notify us immediately of any unauthorized use of your account.
          </p>
          
          <h2>4. Photographer Responsibilities</h2>
          <p>
            If you register as a photographer, you:
          </p>
          <ul>
            <li>
              Are responsible for the accuracy of your profile information, including your portfolio, 
              pricing, and availability.
            </li>
            <li>
              Must have all necessary rights and permissions to display the images in your portfolio.
            </li>
            <li>
              Are solely responsible for your interactions with clients, including fulfilling service 
              agreements and resolving disputes.
            </li>
            <li>
              Understand that Pix Node does not guarantee any minimum number of bookings or revenue.
            </li>
          </ul>
          
          <h2>5. Client Responsibilities</h2>
          <p>
            If you use our platform as a client, you:
          </p>
          <ul>
            <li>
              Acknowledge that Pix Node is not responsible for the quality, safety, or legality of 
              photography services provided.
            </li>
            <li>
              Are solely responsible for your interactions with photographers, including payment and 
              fulfillment of agreements.
            </li>
            <li>
              Agree to honor your commitments to photographers as agreed upon in your communications.
            </li>
          </ul>
          
          <h2>6. Content Guidelines</h2>
          <p>
            You agree not to upload, share, or transmit any content that:
          </p>
          <ul>
            <li>Infringes on intellectual property rights</li>
            <li>Is illegal, harmful, threatening, abusive, or defamatory</li>
            <li>Contains explicit or adult content without appropriate age restrictions</li>
            <li>Includes personal or private information about others without consent</li>
            <li>Contains malware, viruses, or other malicious code</li>
          </ul>
          
          <h2>7. Payments and Fees</h2>
          <p>
            Pix Node may charge fees for certain services, which will be clearly communicated before you 
            incur any charges. Payment terms and methods will be specified at the time of transaction.
          </p>
          
          <h2>8. Intellectual Property</h2>
          <p>
            Photographers retain copyright ownership of their work. By uploading content to Pix Node, 
            photographers grant us a non-exclusive license to display, promote, and use the content for 
            platform purposes.
          </p>
          
          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Pix Node shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages resulting from your use or inability to use the service.
          </p>
          
          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will provide notice of significant changes 
            by posting an announcement on our platform or sending an email to the address associated with your account.
          </p>
          
          <h2>11. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the service at our sole discretion, 
            without notice, for conduct that we determine violates these Terms or is harmful to other users 
            of the service, us, or third parties, or for any other reason.
          </p>
          
          <h2>12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of California, 
            without regard to its conflict of law provisions.
          </p>
          
          <p className="mt-8 text-sm text-gray-600">Last Updated: May 14, 2025</p>
        </div>
      </div>
    </AppLayout>
  );
}
