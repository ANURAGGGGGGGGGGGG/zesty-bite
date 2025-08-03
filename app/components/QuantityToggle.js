'use client';

import { useState, useEffect } from 'react';
import useCartStore from '../../lib/store';

export default function QuantityToggle({ item, initialQuantity = 0, showQuickAdd = true }) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [showControls, setShowControls] = useState(initialQuantity > 0);
  const { addItem, removeItem, items, updateQuantity } = useCartStore();

  useEffect(() => {
    // Find item in cart and get its quantity
    const cartItem = items.find(cartItem => cartItem.id === item.id);
    if (cartItem && cartItem.quantity > 0) {
      setQuantity(cartItem.quantity);
      setShowControls(true);
    }
  }, [item.id, items]);

  const handleDecrease = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      if (newQuantity === 0) {
        setShowControls(false);
        // Find the cart item with matching id to get its cartId
        const cartItem = items.find(cartItem => cartItem.id === item.id);
        if (cartItem) {
          removeItem(cartItem.cartId);
        }
      } else {
        const cartItem = items.find(cartItem => cartItem.id === item.id);
        if (cartItem) {
          updateQuantity(cartItem.cartId, newQuantity);
        }
      }
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addItem(item, 1);
  };

  const handleQuickAdd = () => {
    setShowControls(true);
    setQuantity(1);
    addItem(item, 1);
  };

  if (!showControls && showQuickAdd) {
    return (
      <button
        onClick={handleQuickAdd}
        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
      >
        Quick Add
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleDecrease}
        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors text-gray-700 font-medium"
      >
        -
      </button>
      <span className="text-black font-medium w-8 text-center">{quantity}</span>
      <button
        onClick={handleIncrease}
        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors text-gray-700 font-medium"
      >
        +
      </button>
    </div>
  );
}
