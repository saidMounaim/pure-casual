"use client";

import ShippingInformationForm from "@/components/shared/forms/shipping-information-form";
import OrderSummary from "@/components/shared/order-summary";
import { getProductBySlug } from "@/lib/actions/products";
import { useCartStore } from "@/store/cart-store";
import React, { useEffect, useState } from "react";

const SHIPPING_FLAT_RATE = 5.0;

const CheckoutPage = () => {
  const cart = useCartStore((state) => state.cart);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      const items = await Promise.all(
        cart.map(async (item) => {
          const product = await getProductBySlug(item.slug);
          return {
            ...product,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
          };
        })
      );
      setCartItems(items);
      setLoading(false);
    }
    fetchDetails();
  }, [cart]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? SHIPPING_FLAT_RATE : 0;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          <p className="text-gray-600">Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <ShippingInformationForm orderItems={cart} />
          </div>

          {/* Order Summary */}
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
