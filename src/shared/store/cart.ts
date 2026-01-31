import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Product } from '../api/schema';

export type CartItem = Product & {
  quantity: number;
};

interface CartStore {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    set => ({
      cartItems: [],

      addToCart: (product, quantity) =>
        set(state => {
          const isExist = state.cartItems.some(item => item.id === product.id);

          if (isExist) {
            return {
              cartItems: state.cartItems.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
              ),
            };
          }
          return { cartItems: [...state.cartItems, { ...product, quantity }] };
        }),

      removeFromCart: id =>
        set(state => ({
          cartItems: state.cartItems.filter(item => item.id !== id),
        })),

      increaseQuantity: id =>
        set(state => ({
          cartItems: state.cartItems.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
        })),

      decreaseQuantity: id =>
        set(state => ({
          cartItems: state.cartItems
            .map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
            .filter(item => item.quantity > 0),
        })),
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
