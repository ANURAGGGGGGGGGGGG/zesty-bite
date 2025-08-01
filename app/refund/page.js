'use client';

import Link from 'next/link';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-lg text-gray-600">
            At ZestyBite, we want you to be completely satisfied with your order. Please review our refund policy below.
          </p>
        </div>

        {/* Refund Policy Content */}
        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          {/* Eligibility for Refunds */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Eligibility for Refunds</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We offer refunds under the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Order was cancelled by the restaurant due to unavailability of items</li>
                <li>Food quality issues (cold, incorrect preparation, spoiled ingredients)</li>
                <li>Incorrect order delivered (wrong items or missing items)</li>
                <li>Delivery issues beyond reasonable time (more than 60 minutes delay)</li>
                <li>Order was not delivered due to restaurant closure or technical issues</li>
              </ul>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Process</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                To request a refund, please follow these steps:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Contact our customer support within 24 hours of order delivery</li>
                <li>Provide your order number and reason for refund request</li>
                <li>Submit any supporting evidence (photos of incorrect/damaged food)</li>
                <li>Our team will review your request within 2-3 business days</li>
                <li>If approved, refund will be processed to your original payment method</li>
              </ol>
            </div>
          </section>

          {/* Refund Timeline */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Timeline</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Refund processing times vary by payment method:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Credit/Debit Cards:</strong> 3-5 business days</li>
                <li><strong>Digital Wallets:</strong> 1-3 business days</li>
                <li><strong>Bank Transfers:</strong> 5-7 business days</li>
                <li><strong>Cash on Delivery:</strong> Store credit issued immediately</li>
              </ul>
            </div>
          </section>

          {/* Non-Refundable Items */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Non-Refundable Situations</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Please note that refunds may not be available in the following cases:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Change of mind after order confirmation</li>
                <li>Delivery delays due to weather conditions or natural disasters</li>
                <li>Customer unavailability at delivery address</li>
                <li>Incorrect delivery address provided by customer</li>
                <li>Orders consumed partially or completely before reporting issues</li>
                <li>Requests made after 24 hours of delivery</li>
              </ul>
            </div>
          </section>

          {/* Partial Refunds */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Partial Refunds</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                In some cases, we may offer partial refunds:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>When only specific items in your order have issues</li>
                <li>For minor quality concerns that don't affect the entire order</li>
                <li>When delivery fees are waived due to delays</li>
                <li>Store credit for future orders as an alternative to cash refund</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact for Refunds</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                For refund requests or questions about our refund policy, please contact us:
              </p>
              <div className="bg-orange-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  <li><strong>Email:</strong> refunds@zestybite.com</li>
                  <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                  <li><strong>Hours:</strong> Monday - Sunday, 9:00 AM - 10:00 PM</li>
                  <li><strong>Response Time:</strong> Within 24 hours</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Policy Updates</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We reserve the right to update this refund policy at any time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>
          </section>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 text-center">
          <div className="space-x-4">
            <Link
              href="/"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-orange-600 text-orange-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}