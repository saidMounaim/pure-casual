"use client";

import { Heart } from "lucide-react";
import React from "react";
import { useWishlistStore } from "@/store/wishlist-store";

type ProductWishListButtonProps = {
  product: {
    id: string;
    title: string;
    price: number;
    slug: string;
    featured?: { url: string };
  };
};

const ProductWishListButton = ({ product }: ProductWishListButtonProps) => {
  const isInWishlist = useWishlistStore((state) =>
    state.isInWishlist(product.id)
  );
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      type="button"
      className={`flex items-center gap-1 px-3 py-2 rounded border ${
        isInWishlist
          ? "bg-red-100 border-red-400 text-red-600"
          : "bg-white border-gray-300 text-gray-700"
      } hover:bg-red-50 transition`}
      onClick={handleWishlist}
      aria-pressed={isInWishlist}
    >
      <Heart
        size={18}
        fill={isInWishlist ? "#ef4444" : "none"}
        stroke={isInWishlist ? "#ef4444" : "currentColor"}
      />
      {isInWishlist ? "Wishlisted" : "Add to Wishlist"}
    </button>
  );
};

export default ProductWishListButton;
