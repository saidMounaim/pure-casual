import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  productId: string;
  size: string;
  price: number;
  quantity: number;
};

type CartState = {
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
  addToCart: (item: CartItem) => void;
  cart: CartItem[];
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      selectedSize: null,
      setSelectedSize: (size) => set({ selectedSize: size }),
      cart: [],
      addToCart: (item) =>
        set((state) => ({
          cart: [...state.cart, item],
          selectedSize: null, // reset after add
        })),
    }),
    {
      name: "cart-storage", // key in localStorage
      partialize: (state) => ({ cart: state.cart }), // only persist cart
    }
  )
);

export const useCartCount = () =>
  useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );
