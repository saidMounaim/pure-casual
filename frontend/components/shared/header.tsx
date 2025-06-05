import { SidebarTrigger } from "@/components/ui/sidebar";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            Pure Casual
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/checkout">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ShoppingCart size={16} />
              Cart
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
