import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type OrderSummaryProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cartItems: any;
  subtotal: number;
  shipping: number;
  total: number;
};

export default function OrderSummary({
  cartItems,
  subtotal,
  shipping,
  total,
}: OrderSummaryProps) {
  const pathImage = process.env.NEXT_PUBLIC_STRAPI_URL;

  return (
    <Card className="sticky top-6 h-max">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex gap-3">
              <Image
                src={`${pathImage}${item.featured.url}`}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg"
                width={64}
                height={64}
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.title}</h4>
                <div className="flex gap-2 text-xs text-gray-600 mt-1">
                  <Badge variant="outline">{item.size}</Badge>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">
                    Qty: {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Order Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Button className="w-full" size="lg">
          Place Order - ${total.toFixed(2)}
        </Button>

        <p className="text-xs text-gray-600 text-center">
          By placing this order, you agree to our terms and conditions
        </p>
      </CardContent>
    </Card>
  );
}
