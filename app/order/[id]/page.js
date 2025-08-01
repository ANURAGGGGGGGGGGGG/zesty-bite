'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FiCheckCircle, FiPrinter, FiClock, FiPackage, FiShoppingBag, FiTruck, FiCoffee, FiMapPin, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';

function formatINR(amount) {
  return `₹${amount.toFixed(2)}`;
}

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const existingOrders = JSON.parse(localStorage.getItem('zesty-bite-orders') || '[]');
    const foundOrder = existingOrders.find(o => o.id.toString() === id);
    setOrder(foundOrder);
    
    // Simulate order progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) return prev + 20;
        return prev;
      });
      
      setActiveStep(prev => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 3000);
    
    return () => clearInterval(progressInterval);
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-16 h-16 rounded-full bg-orange-500 animate-ping opacity-75"></div>
            <div className="w-16 h-16 rounded-full bg-orange-600 absolute top-0 flex items-center justify-center">
              <FiPackage className="text-white text-2xl" />
            </div>
          </div>
          <p className="text-xl max-[426px]:text-lg text-gray-600 max-[426px]:text-sm">Loading your order details...</p>
        </div>
      </div>
    );
  }

  const estimatedTime = '25-35 minutes';

  // Corrected statusSteps with valid icons
  const statusSteps = [
    { icon: FiPackage, label: 'Order Placed', completed: true },
    { icon: FiCoffee, label: 'Preparing', completed: activeStep >= 1 },
    { icon: FiTruck, label: 'On the Way', completed: activeStep >= 2 },
    { icon: FiCheckCircle, label: 'Delivered', completed: activeStep >= 3 },
  ];

  const handlePrintBill = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 max-[426px]:px-2 max-[426px]:py-4">
        {/* Confirmation Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative overflow-hidden"
        >
          {showAnimation && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 30, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-500 rounded-full z-0"
                onAnimationComplete={() => setShowAnimation(false)}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 15, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-300 rounded-full z-0"
              />
            </>
          )}
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
            className="relative w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FiCheckCircle className="text-white text-5xl" />
            <div className="absolute -inset-4 rounded-full border-4 border-green-300 border-dashed animate-ping"></div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-4xl max-[426px]:text-3xl font-bold text-gray-900 max-[426px]:text-sm mb-4 max-[426px]:mb-2"
          >
            Order Confirmed!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xl max-[426px]:text-lg text-gray-600 max-w-xl mx-auto"
          >
            Thank you for your order. We're preparing it now with extra care!
          </motion.p>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-[426px]:p-4 max-[426px]:p-4 mb-10 max-[426px]:mb-6 relative overflow-hidden border border-orange-100"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-white opacity-30 z-0"></div>
          
          <h2 className="text-2xl max-[426px]:text-xl font-bold mb-8 max-[426px]:mb-4 text-center relative z-10 text-black">Order Journey</h2>
          
          {/* Progress Bar */}
          <div className="mb-10 relative z-10">
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <motion.div 
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full" 
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 1.3 }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Order Placed</span>
              <span>On the Way</span>
            </div>
          </div>
          
          {/* Status Steps */}
          <div className="grid grid-cols-4 max-[426px]:grid-cols-2 gap-4 max-[426px]:gap-2 relative z-10">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className={`text-center p-4 rounded-xl transition-all ${
                    step.completed 
                      ? 'bg-gradient-to-b from-orange-50 to-white shadow-md border border-orange-100' 
                      : 'opacity-50'
                  }`}
                >
                  <div className={`w-14 h-14 max-[426px]:w-10 max-[426px]:h-10 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    step.completed 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon className="text-xl" />
                  </div>
                  <span className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden border border-orange-100"
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-100 rounded-full opacity-20"></div>
            <h2 className="text-2xl max-[426px]:text-xl font-bold mb-6 max-[426px]:mb-4 relative z-10 text-black">Order Details</h2>
            
            <div className="space-y-4 relative z-10"> 
              <div className="flex items-start py-3 border-b border-orange-50">
                <FiPackage className="text-orange-600 max-[426px]:text-sm text-xl mt-1 mr-4" />
                <div>
                  <span className="text-gray-600 block text-black">Order ID:</span>
                  <span className="font-medium text-lg text-black">#{order.id}</span>
                </div>
              </div>
              
              <div className="flex items-start py-3 border-b border-orange-50">
                <FiClock className="text-orange-600 text-xl mt-1 mr-4" />
                <div>
                  <span className="text-gray-600 block">Order Date:</span>
                  <span className="font-medium text-black">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
              
              <div className="flex items-start py-3 border-b border-orange-50">
                <FiUser className="text-orange-600 text-xl mt-1 mr-4" />
                <div>
                  <span className="text-gray-600 block">Customer:</span>
                  <span className="font-medium text-black">{order.customerInfo.name}</span>
                </div>
              </div>
              
              <div className="flex items-start py-3 border-b border-orange-50">
                <FiMapPin className="text-orange-600 text-xl mt-1 mr-4" />
                <div>
                  <span className="text-gray-600 block">Delivery Address:</span>
                  <span className="font-medium text-black">
                    {order.customerInfo.address}, {order.customerInfo.city} - {order.customerInfo.zipCode}
                  </span>
                </div>
              </div>
              
              <div className="flex items-start pt-3">
                <div className="bg-orange-100 p-3 rounded-lg w-full">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Estimated Arrival:</span>
                    <span className="font-bold text-orange-600 max-[426px]:text-sm">{estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
            className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden border border-orange-100"
          >
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-100 rounded-full opacity-20"></div>
            <h2 className="text-2xl font-bold mb-6 relative z-10 text-black">Order Summary</h2>
            
            <div className="space-y-4 max-h-80 max-[426px]:max-h-64 overflow-y-auto pr-2 relative z-10">
              {order.items.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2 + index * 0.1 }}
                  className="flex items-center py-3 border-b border-orange-50"
                >
                  <div className="w-16 h-16 max-[426px]:w-12 max-[426px]:h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg overflow-hidden mr-4 max-[426px]:mr-2 flex items-center justify-center">
                    <div className="text-orange-600 text-2xl">
                      {item.category === 'pizza' ? '🍕' : 
                       item.category === 'burgers' ? '🍔' : 
                       item.category === 'desserts' ? '🍰' : '🥤'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-600">x{item.quantity}</span>
                      <span className="font-bold text-orange-600">{formatINR(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="border-t mt-4 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatINR(order.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium text-gray-900">
                    {order.totalPrice >= 499 ? (
                      <span className="text-green-600">Free</span>
                    ) : '₹249.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium text-gray-900">{formatINR(order.totalPrice * 0.08)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg max-[426px]:text-base font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-orange-600">{formatINR(order.totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrintBill}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 max-[426px]:px-4 max-[426px]:py-2 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            <FiPrinter className="text-xl" /> Print Bill
          </motion.button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/menu"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              <FiShoppingBag className="text-xl" /> Continue Shopping
            </Link>
          </motion.div>
        </motion.div>

        {/* Delivery Animation */}
        <motion.div 
          className="mt-16 relative h-24 max-[426px]:h-16 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          <div className="absolute w-full h-1 bg-gray-200 top-1/2 transform -translate-y-1/2"></div>
          <motion.div
            initial={{ left: '-10%' }}
            animate={{ left: '110%' }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 transform -translate-y-1/2"
          >
            <div className="flex items-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg">
                <FiTruck className="text-xl" />
              </div>
              <div className="ml-2 bg-white p-3 rounded-lg shadow-md border border-orange-100">
                <div className="text-sm font-medium text-black">Your order is on the way!</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}