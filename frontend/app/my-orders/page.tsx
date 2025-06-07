import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/actions/auth";
import { getMyOrders } from "@/lib/actions/orders";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyOrdersPage() {
  const user = await getUser();
  if (!user) redirect("/sign-in");

  const orders = await getMyOrders();

  return (
    <div className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <Card
              key={order.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Order {order.id}</CardTitle>
                </div>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(order.publishedAt).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium">{order.product.title}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {order.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">${order.price}</p>
                    </div>
                  </div>

                  {/* Order Total and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-lg font-bold">Total: ${order.price}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-4">
                Start shopping to see your orders here
              </p>
              <Button asChild>
                <Link href="/products" className="w-full">
                  Go to Products
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
