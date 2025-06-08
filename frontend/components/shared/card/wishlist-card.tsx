"use client";

import { useWishlistStore } from "@/store/wishlist-store";
import { Heart } from "lucide-react";

type WishlistCardProps = {
  id: string;
  title: string;
  price: number;
  slug: string;
  imageUrl?: string;
};

export default function WishlistCard({
  id,
  title,
  price,
  slug,
  imageUrl,
}: WishlistCardProps) {
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  return (
    <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50 flex flex-col gap-3 shadow hover:shadow-lg transition">
      <a href={`/product/${slug}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover object-top rounded-md mb-2"
        />
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </a>
      <div className="flex items-center justify-between">
        <span className="text-red-600 font-bold text-xl">${price}</span>
        <button
          onClick={() => removeFromWishlist(id)}
          className="flex items-center gap-1 px-3 py-1 rounded bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 transition"
        >
          <Heart size={16} fill="#ef4444" stroke="#ef4444" />
          Remove
        </button>
      </div>
    </div>
  );
}
