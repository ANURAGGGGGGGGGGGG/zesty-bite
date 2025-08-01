'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCreditCard, FiInfo } from 'react-icons/fi';
import { motion } from 'framer-motion';
import useCartStore from '../../lib/store';

const formatINR = (amount) => `₹${amount.toFixed(2)}`;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'cash',
    specialInstructions: ''
  });

  // Pre-fill form with saved data if available
  useEffect(() => {
    const savedFormData = localStorage.getItem('zesty-bite-checkout');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
    // Save form data to localStorage
    localStorage.setItem('zesty-bite-checkout', JSON.stringify(newFormData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create order object
      const order = {
        id: Date.now(),
        items,
        customerInfo: formData,
        totalPrice: finalTotal,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Store order in localStorage
      const existingOrders = JSON.parse(localStorage.getItem('zesty-bite-orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('zesty-bite-orders', JSON.stringify(existingOrders));

      // Clear cart and saved form data
      clearCart();
      localStorage.removeItem('zesty-bite-checkout');

      // Redirect to order confirmation
      router.push(`/order/${order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiInfo className="text-orange-600 text-4xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add delicious items from our menu to proceed to checkout.</p>
            <Link
              href="/menu"
              className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              Explore Our Menu
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const deliveryFee = totalPrice >= 499 ? 0 : 249;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Complete Your Order</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Just a few more details to get your delicious food on the way!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white mr-3">
                <span className="font-bold">1</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Delivery Information</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-4 text-gray-400" />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    placeholder="123 Main Street"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    placeholder="Mumbai"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    placeholder="400001"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center mb-6 mt-10">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white mr-3">
                    <span className="font-bold">2</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
                </div>
                
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                      className="hidden peer"
                    />
                    <label 
                      htmlFor="cash" 
                      className="flex flex-col items-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-orange-500 peer-checked:bg-orange-50"
                    >
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                        <FiCreditCard className="text-orange-500" />
                      </div>
                      <span className="text-sm font-medium text-black">Cash</span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="hidden peer"
                    />
                    <label 
                      htmlFor="card" 
                      className="flex flex-col items-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-orange-500 peer-checked:bg-orange-50"
                    >
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                        <FiCreditCard className="text-orange-500" />
                      </div>
                      <span className="text-sm font-medium text-black">Card</span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="UPI"
                      name="paymentMethod"
                      value="UPI"
                      checked={formData.paymentMethod === 'UPI'}
                      onChange={handleInputChange}
                      className="hidden peer"
                    />
                    <label 
                      htmlFor="UPI" 
                      className="flex flex-col items-center p-4 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-orange-500 peer-checked:bg-orange-50"
                    >
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                        <FiCreditCard className="text-orange-500" />
                      </div>
                      <span className="text-sm font-medium text-black">UPI</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  rows={3}
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  placeholder="Any special delivery instructions, dietary restrictions, or notes for the kitchen..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all mt-8 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Your Order...
                  </div>
                ) : `Place Order - ${formatINR(finalTotal)}`}
              </motion.button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white mr-3">
                  <span className="font-bold">3</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.cartId} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-lg overflow-hidden mr-4">
                        <img 
                          src={item.image || 'https://via.placeholder.com/150'} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-500 text-sm">x{item.quantity}</p>
                        {Object.keys(item.customizations || {}).length > 0 && (
                          <div className="mt-1">
                            <p className="text-xs text-gray-500 font-medium">CUSTOMIZED:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {Object.entries(item.customizations).map(([key, value]) => (
                                <span key={key} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">
                                  {key}: {value}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="font-medium text-gray-900">{formatINR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatINR(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium text-gray-900">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : formatINR(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium text-gray-900">{formatINR(tax)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-orange-600">{formatINR(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-2xl p-5 border border-orange-200">
              <h3 className="font-bold text-orange-800 mb-2 flex items-center">
                <FiInfo className="mr-2" /> Estimated Delivery Time
              </h3>
              <p className="text-orange-700">25-35 minutes</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5 border border-orange-100">
              <h3 className="font-bold text-gray-900 mb-3">Need help?</h3>
              <p className="text-gray-600 text-sm mb-4">Our support team is available to assist you with any questions about your order.</p>
              <div className="flex items-center text-orange-600 font-medium">
                <FiPhone className="mr-2" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}