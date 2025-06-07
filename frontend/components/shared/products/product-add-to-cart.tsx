"use client";

import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

export default function ProductAddToCart({
  price,
  productId,
}: {
  price: number;
  productId: string;
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
    });
    toast.success("Product added to cart!");
  };

  return (
    <div>
      <button
        className="w-full bg-black text-white py-2 rounded"
        onClick={handleAdd}
      >
        Add to Cart
      </button>
    </div>
  );
}
