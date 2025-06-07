"use client";

import { useCartStore } from "@/store/cart-store";

export default function ProductSizeSelect({ sizes }: { sizes: string[] }) {
  const selectedSize = useCartStore((state) => state.selectedSize);
  const setSelectedSize = useCartStore((state) => state.setSelectedSize);

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">Select Size</label>
      <div className="flex gap-2">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          sizes.map((size: any) => (
            <button
              key={size.Name}
              type="button"
              className={`px-3 py-1 border rounded ${
                selectedSize === size.Name
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900"
              }`}
              onClick={() => setSelectedSize(size.Name)}
            >
              {size.Name}
            </button>
          ))
        }
      </div>
    </div>
  );
}
