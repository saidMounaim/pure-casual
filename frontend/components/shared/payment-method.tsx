import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PaymentMethod() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <div>
              <h3 className="font-semibold text-green-800">Cash on Delivery</h3>
              <p className="text-sm text-green-700">
                Pay when your order arrives at your doorstep
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">How it works:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Your order will be prepared and shipped</li>
            <li>• Our delivery partner will contact you</li>
            <li>• Pay the exact amount when you receive your order</li>
            <li>• Cash or card payment accepted at delivery</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
