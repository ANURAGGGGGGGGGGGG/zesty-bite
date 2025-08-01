'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Contact Us Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-black mb-8">Contact Us</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4">
              We would love to hear from you! Whether you have questions, feedback, or need assistance, please reach out to us using the information below.
            </p>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Email</h2>
              <p className="text-gray-700">support@zestybite.com</p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Phone</h2>
              <p className="text-gray-700">(555) 123-4567</p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-black mb-4">Address</h2>
              <p className="text-gray-700">123 Food Street, Culinary City, FC 12345</p>
            </section>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}