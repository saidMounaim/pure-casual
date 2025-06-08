"use client";

import WishlistCard from "@/components/shared/card/wishlist-card";
import { useWishlistStore } from "@/store/wishlist-store";

export default function WishlistPage() {
  const wishlist = useWishlistStore((state) => state.wishlist);

  return (
    <div className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Wishlist</h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <p className="text-gray-600">
              {wishlist.length} products in wishlist
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.length === 0 ? (
            <p className="text-gray-500 col-span-full">
              Your wishlist is empty.
            </p>
          ) : (
            wishlist.map((product) => {
              return (
                <WishlistCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  slug={product.slug}
                  imageUrl={product.featured?.url}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
