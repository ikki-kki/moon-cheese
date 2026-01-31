import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Product } from '../api/schema';

interface CartStore {
  products: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

export const useCartStore = create(
  persist<CartStore>(
    set => ({
      products: [],
      addToCart: product => set(state => ({ products: [...state.products, product] })),
      removeFromCart: id => set(state => ({ products: state.products.filter(p => p.id !== id) })),
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
