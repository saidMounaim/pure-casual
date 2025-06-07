"use client";

import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

export default function ProductAddToCart({
  price,
  productId,
  slug,
}: {
  price: number;
  productId: string;
  slug: string;
}) {
  const selectedSize = useCartStore((state) => state.selectedSize);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }
    addToCart({
      productId,
      size: selectedSize,
      price,
      quantity: 1,
      slug,
    });
    toast.success("Product added to cart!");
  };

  return (
    <div>
      <button
        className="w-full bg-black text-white py-2 rounded"
        onClick={handleAdd}
        disabled={!selectedSize}
        aria-disabled={!selectedSize}
      >
        Add to Cart
      </button>
    </div>
  );
}
