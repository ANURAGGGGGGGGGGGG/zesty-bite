import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      adminMode: false,

      toggleAdminMode: () => set((state) => ({ adminMode: !state.adminMode })),

      addItem: (product, quantity = 1, customizations = {}) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) => 
            item.id === product.id && 
            JSON.stringify(item.customizations) === JSON.stringify(customizations)
        );

        let newItems;
        if (existingItemIndex > -1) {
          newItems = items.map((item, index) => 
            index === existingItemIndex 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [...items, {
            ...product,
            quantity,
            customizations,
            cartId: Date.now() + Math.random()
          }];
        }

        set({
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        });
      },

      removeItem: (cartId) => {
        const { items } = get();
        const newItems = items.filter(item => item.cartId !== cartId);
        
        set({
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        });
      },

      updateQuantity: (cartId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartId);
          return;
        }

        const { items } = get();
        const newItems = items.map(item => 
          item.cartId === cartId ? { ...item, quantity } : item
        );

        set({
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0
        });
      }
    }),
    {
      name: 'zesty-bite-cart',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useCartStore;