import { useState } from 'react';

export default function PrivacyPolicyDialog({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          aria-label="Close Privacy Policy"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-black mb-4">Privacy Policy</h2>
        <div className="overflow-y-auto max-h-96">
          <p className="mb-4 text-black">
            Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information.
          </p>
          <p className="mb-4 text-black">
            We collect personal information only when necessary to provide our services. We do not share your information with third parties without your consent.
          </p>
          <p className="mb-4 text-black">
            We use cookies to improve your experience on our site. You can disable cookies in your browser settings.
          </p>
          <p className="mb-4 text-black">
            If you have any questions about our privacy practices, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
}