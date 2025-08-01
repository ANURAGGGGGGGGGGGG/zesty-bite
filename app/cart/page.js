'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiX, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import useCartStore from '../../lib/store';

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();
  const formatINR = (amount) => `₹${amount.toFixed(2)}`;
  const deliveryFee = totalPrice >= 499 ? 0 : 249;
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [removingItem, setRemovingItem] = useState(null);

  const handleQuantityChange = (cartId, newQuantity) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    if (newQuantity < 1) {
      setRemovingItem(cartId);
      setTimeout(() => {
        removeItem(cartId);
        setRemovingItem(null);
      }, 300);
    } else {
      updateQuantity(cartId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length > 0) {
      setIsCheckingOut(true);
      // Simulate processing before redirect
      setTimeout(() => {
        window.location.href = '/checkout';
      }, 1500);
    }
  };

  // Empty cart animation state
  const [bounce, setBounce] = useState(false);
  useEffect(() => {
    if (items.length === 0) {
      const timer = setTimeout(() => setBounce(true), 100);
      return () => clearTimeout(timer);
    }
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto px-4 max-[376px]:px-2 sm:px-6 lg:px-8 py-16 max-[376px]:py-8">
          <div className="text-center">
            <motion.div
              animate={bounce ? { 
                scale: [1, 1.1, 1],
                y: [0, -20, 0]
              } : {}}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="text-6xl mb-4 inline-block"
            >
              🛒
            </motion.div>
            <h1 className="text-3xl max-[376px]:text-2xl font-bold text-gray-900 mb-4">Your cart feels lonely</h1>
            <p className="text-gray-600 mb-8">Delicious dishes are waiting to join your cart!</p>
            <Link
              href="/menu"
              className="inline-block bg-orange-600 text-white px-8 max-[376px]:px-6 py-3 rounded-full text-lg max-[376px]:text-base font-semibold hover:bg-orange-700 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-orange-200"
            >
              Explore Our Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-4 max-[376px]:px-2 sm:px-6 lg:px-8 py-8 max-[376px]:py-4">
        <div className="flex justify-between items-center mb-8 max-[376px]:mb-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl max-[376px]:text-2xl font-bold text-gray-900 flex items-center gap-2"
          >
            <FiShoppingBag className="text-orange-500" /> Shopping Cart
          </motion.h1>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCart}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium px-4 max-[376px]:px-2 py-2 rounded-lg hover:bg-red-50 transition-all max-[376px]:text-sm"
          >
            <FiTrash2 /> Clear Cart
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-[376px]:gap-4">
          <div className="lg:col-span-2">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.cartId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: removingItem === item.cartId ? 0 : 1, 
                    y: 0,
                    height: removingItem === item.cartId ? 0 : 'auto'
                  }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-orange-100"
                >
                  <div className="p-4 max-[376px]:p-3">
                    <div className="flex items-start space-x-4 max-[376px]:space-x-3">
                      <div className="relative">
                        <div className="w-24 h-24 max-[376px]:w-20 max-[376px]:h-20 rounded-xl overflow-hidden border-2 border-orange-100">
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {item.quantity}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg max-[376px]:text-base font-bold text-gray-900">{item.name}</h3>
                          <button
                            onClick={() => {
                              setRemovingItem(item.cartId);
                              setTimeout(() => removeItem(item.cartId), 300);
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FiX size={20} />
                          </button>
                        </div>
                        
                        <p className="text-gray-600 text-sm max-[376px]:text-xs mt-1">{item.description}</p>
                        
                        {Object.keys(item.customizations || {}).length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs text-gray-500 font-medium">CUSTOMIZED:</p>
                            <div className="flex flex-wrap gap-2 max-[376px]:gap-1 mt-2">
                              {Object.entries(item.customizations).map(([key, value]) => (
                                <span 
                                  key={key} 
                                  className="px-2 py-1 bg-orange-50 text-orange-700 text-xs max-[376px]:text-[10px] rounded-full"
                                >
                                  {key}: {value}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                              className="w-10 h-10 max-[376px]:w-8 max-[376px]:h-8 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors text-orange-600"
                            >
                              <FiMinus />
                            </motion.button>
                            
                            <motion.span 
                              key={item.quantity}
                              animate={isAnimating ? { 
                                scale: [1, 1.3, 1],
                                color: ["#000", "#ea580c", "#000"]
                              } : {}}
                              className="w-8 text-center font-bold text-gray-900 ml-3 max-[376px]:ml-1"
                            >
                              {item.quantity}
                            </motion.span>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                              className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors text-orange-600 ml-3 max-[376px]:ml-1"
                            >
                              <FiPlus />
                            </motion.button>
                          </div>

                          <div className="flex items-center space-x-4">
                            <span className="text-xl max-[376px]:text-lg font-bold text-orange-600">
                              {formatINR(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 max-[376px]:p-4 sticky top-6 border border-orange-100"
            >
              <h2 className="text-xl max-[376px]:text-lg font-bold text-gray-900 mb-5 max-[376px]:mb-3 pb-3 border-b border-gray-200">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({totalItems})</span>
                  <span className="font-medium text-gray-900">{formatINR(totalPrice)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium text-gray-900">
                    {deliveryFee === 0 ? 'Free' : formatINR(deliveryFee)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium text-gray-900">{formatINR(totalPrice * 0.08)}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg max-[376px]:text-base font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-orange-600">
                      {formatINR(totalPrice + deliveryFee + totalPrice * 0.08)}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Order...
                  </>
                ) : 'Proceed to Checkout'}
              </motion.button>

              <Link
                href="/menu"
                className="block w-full text-center text-orange-600 py-3 mt-4 border-2 border-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-colors"
              >
                Continue Shopping
              </Link>
              
              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-sm text-orange-700 flex items-start gap-2">
                  <span className="text-orange-500 font-bold">✓</span>
                  Your order qualifies for free delivery on orders above ₹499
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}