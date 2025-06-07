"use client";

import { useCartCount } from "@/store/cart-store";

export default function CartCount() {
  const cartCount = useCartCount();

  if (cartCount === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
      {cartCount}
    </span>
  );
}
