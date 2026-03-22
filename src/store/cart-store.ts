"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartProduct = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  stock: number;
  image: string;
};

export type CartLine = CartProduct & {
  quantity: number;
};

type CartState = {
  items: CartLine[];
  isDrawerOpen: boolean;
  addItem: (product: CartProduct, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  subtotal: () => number;
  itemCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.productId === product.productId);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.productId
                  ? { ...item, quantity: Math.min(item.stock, item.quantity + quantity) }
                  : item,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity: Math.min(product.stock, Math.max(1, quantity)),
              },
            ],
          };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.min(item.stock, Math.max(1, quantity)) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      subtotal: () =>
        get().items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0),
      itemCount: () => get().items.reduce((accumulator, item) => accumulator + item.quantity, 0),
    }),
    {
      name: "vanta-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

