"use server";

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
