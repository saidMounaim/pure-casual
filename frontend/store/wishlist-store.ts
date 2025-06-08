import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistItem = {
  id: string;
  title: string;
  price: number;
  slug: string;
  featured?: { url: string };
};

type WishlistState = {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (item) => {
        if (!get().wishlist.some((w) => w.id === item.id)) {
          set((state) => ({
            wishlist: [...state.wishlist, item],
          }));
        }
      },
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        })),
      clearWishlist: () => set({ wishlist: [] }),
      isInWishlist: (id) => get().wishlist.some((item) => item.id === id),
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({ wishlist: state.wishlist }),
    }
  )
);
