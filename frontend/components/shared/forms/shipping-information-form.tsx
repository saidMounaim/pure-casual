"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { shippingSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";
import { placeOrderWithItems } from "@/lib/actions/orders";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export type ShippingFormValues = z.infer<typeof shippingSchema>;

export default function ShippingInformationForm({
  orderItems,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderItems: any[];
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user }: any = useUser();

  const router = useRouter();

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    },
  });

  const onSubmit = async (data: ShippingFormValues) => {
    if (!user) {
      toast.error("You must be logged in to place an order.");
      return;
    }
    try {
      const { firstName, lastName, email, phone, address, notes } = data;
      const placeOrder = await placeOrderWithItems({
        firstName,
        lastName,
        email,
        phone,
        address,
        notes,
        orderItems: orderItems.map((item) => ({
          size: item.size,
          quantity: item.quantity,
          product: item.productId,
          price: item.price,
        })),
      });

      if (placeOrder.success) {
        toast.success("Order placed successfully!");
        form.reset();
        Cookies.set("orderSuccess", "true", { expires: 0.01 });
        router.push("/thank-you");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting shipping form:", error);
      toast.error("Something went wrong while submitting the form.");
      return;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Instructions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any special delivery instructions..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardTitle>Payment Method</CardTitle>
            <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <div>
                  <h3 className="font-semibold text-green-800">
                    Cash on Delivery
                  </h3>
                  <p className="text-sm text-green-700">
                    Pay when your order arrives at your doorstep
                  </p>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Place Order
            </Button>

            <p className="text-xs text-gray-600 text-center">
              By placing this order, you agree to our terms and conditions
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
