import type { Book } from '@/data/books';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  book: Book;
  quantity: number;
};

type CartStoreType = {
  cart: CartItem[];
  addToCart: (item: Book) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStoreType>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.book.id === item.id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.book.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          } else {
            return { cart: [...state.cart, { book: item, quantity: 1 }] };
          }
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter((cartItem) => cartItem.book.id !== id),
            };
          } else {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.book.id === id ? { ...cartItem, quantity } : cartItem
              ),
            };
          }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((cartItem) => cartItem.book.id !== id),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

export const useTotalItems = () =>
  useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

export const useTotalPrice = () =>
  useCartStore((state) =>
    state.cart.reduce(
      (sum, item) => sum + item.quantity * ((item.book as Book).price ?? 0),
      0
    )
  );
