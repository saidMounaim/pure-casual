"use server";

import { getUser } from "./auth";

export async function placeOrderWithItems({
  firstName,
  lastName,
  email,
  phone,
  address,
  notes,
  orderItems,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderItems: any[];
}) {
  const user = await getUser();
  console.log(user);
  try {
    // create order
    const orderRes = await fetch(`${process.env.STRAPI_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          firstName,
          lastName,
          email,
          phone,
          address,
          notes,
          user: user?.documentId,
        },
      }),
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      return { success: false, error: "Something went wrong please try again" };
    }

    const orderId = orderData.data.documentId;

    // create order items
    for (const item of orderItems) {
      await fetch(`${process.env.STRAPI_URL}/api/order-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            size: item.size,
            quantity: item.quantity,
            product: item.product,
            order: orderId,
            price: item.price,
          },
        }),
      });
    }

    return { success: true, order: orderData.data };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error placing order:", err);
    return { success: false, message: err.message };
  }
}

// get my orders
export async function getMyOrders() {
  const user = await getUser();

  try {
    // fetch user orders
    const resOrders = await fetch(
      `${process.env.STRAPI_URL}/api/orders?filters[user][id][$eq]=${user.id}&sort=createdAt:desc`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    const ordersData = await resOrders.json();

    if (!resOrders.ok) {
      return { success: false, error: "Failed to fetch orders" };
    }

    const orders = ordersData.data;

    if (orders.length === 0) {
      return []; // no orders found
    }

    // Get order IDs to fetch order items
    const orderIds = orders.map((order) => order.id);

    // fetch orderItems filtered by those order IDs + populate products
    const resItems = await fetch(
      `${
        process.env.STRAPI_URL
      }/api/order-items?filters[order][id][$in]=${orderIds.join(
        ","
      )}&populate=product`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!resItems.ok) {
      return { success: false, error: "Failed to fetch order items" };
    }

    const orderItemsData = await resItems.json();
    const orderItems = orderItemsData.data;

    return orderItems;
  } catch (err) {
    console.error("Error fetching orders:", err);
    return { success: false, error: "Unknown error" };
  }
}
