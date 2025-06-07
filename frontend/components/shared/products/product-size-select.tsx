"use client";

import { useCartStore } from "@/store/cart-store";

type SizeType = { Name: string } | string;

export default function ProductSizeSelect({
  sizes,
  productId,
}: {
  sizes: SizeType[];
  productId: string;
}) {
  const selectedSize = useCartStore((state) => state.selectedSize);
  const setSelectedSize = useCartStore((state) => state.setSelectedSize);
  const cart = useCartStore((state) => state.cart);

  // Helper to get size value
  const getSizeValue = (size: SizeType) =>
    typeof size === "string" ? size : size.Name;

  // Only consider sizes in cart for this product
  const sizesInCart = cart
    .filter((item) => item.productId === productId)
    .map((item) => item.size);

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">Select Size</label>
      <div className="flex gap-2">
        {sizes.map((size) => {
          const sizeValue = getSizeValue(size);
          const isInCart = sizesInCart.includes(sizeValue);
          return (
            <button
              key={sizeValue}
              type="button"
              className={`px-3 py-1 border rounded ${
                selectedSize === sizeValue
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900"
              } ${isInCart ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => !isInCart && setSelectedSize(sizeValue)}
              disabled={isInCart}
              aria-disabled={isInCart}
            >
              {sizeValue}
              {isInCart && " (In Cart)"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
