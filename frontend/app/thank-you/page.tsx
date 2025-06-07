"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    const orderSuccess = Cookies.get("orderSuccess");
    if (!orderSuccess) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full flex flex-col items-center">
        {/* ...your thank you UI... */}
        <h1 className="text-2xl font-bold text-green-700 mb-2">Thank You!</h1>
        <p className="text-gray-700 mb-4 text-center">
          Your order has been placed successfully.
          <br />
          We appreciate your business!
        </p>
        <Link
          href="/"
          className="inline-block mt-2 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
