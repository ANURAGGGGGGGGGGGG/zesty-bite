'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Terms and Conditions Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-4"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Terms and Conditions
            </h1>
            <p className="text-gray-600 mb-6">
              Last updated: June 15, 2025
            </p>
          </div>

          <div className="space-y-10">
            {[
              {
                icon: '✅',
                title: '1. Acceptance of Terms',
                content: 'By accessing or using ZestyBite, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use our services.'
              },
              {
                icon: '💻',
                title: '2. Use of Service',
                content: 'You may use our platform to browse menus, place orders, and manage your account. You agree not to misuse the service or engage in any activity that could harm ZestyBite or its users.'
              },
              {
                icon: '💳',
                title: '3. Orders and Payment',
                content: 'All orders are subject to acceptance and availability. Prices and menu items may change without notice. Payment must be made at the time of order using the available payment methods.'
              },
              {
                icon: '🚚',
                title: '4. Delivery',
                content: 'We strive to deliver your order promptly, but delivery times are estimates and not guaranteed. ZestyBite is not liable for delays due to circumstances beyond our control.'
              },
              {
                icon: '👤',
                title: '5. Account Responsibility',
                content: 'You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.'
              },
              {
                icon: '©️',
                title: '6. Intellectual Property',
                content: 'All content on ZestyBite, including logos, text, images, and software, is the property of ZestyBite or its licensors and is protected by copyright and trademark laws.'
              },
              {
                icon: '⚠️',
                title: '7. Limitation of Liability',
                content: 'ZestyBite is not liable for any indirect, incidental, or consequential damages arising from your use of the service.'
              },
              {
                icon: '🔄',
                title: '8. Changes to Terms',
                content: 'We may update these Terms and Conditions at any time. Continued use of the service constitutes acceptance of the revised terms.'
              },
              {
                icon: '📞',
                title: '9. Contact Us',
                content: (
                  <div>
                    <p className="mb-4">If you have any questions about these Terms and Conditions, please contact us at:</p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="mb-2"><span className="font-semibold">Email:</span> support@zestybite.com</p>
                      <p className="mb-2"><span className="font-semibold">Phone:</span> (555) 123-4567</p>
                      <p><span className="font-semibold">Address:</span> 123 Food Street, Culinary City, FC 12345</p>
                    </div>
                  </div>
                )
              }
            ].map((section, index) => (
              <section 
                key={index} 
                className={`pb-6 ${index < 8 ? 'border-b border-gray-100' : ''}`}
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-3 mt-1">{section.icon}</span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h2>
                    <div className="text-gray-700">
                      {typeof section.content === 'string' ? <p>{section.content}</p> : section.content}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" /> Back to Home
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}