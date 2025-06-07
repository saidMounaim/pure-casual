"use server";

export async function getFeaturedProducts() {
  try {
    const res = await fetch(
      `${process.env.STRAPI_URL}/api/products?pagination[limit]=3&populate=*`,
      {
        cache: "no-store", // always fresh
      }
    );

    console.log(res);
    if (!res.ok) {
      return { success: false, message: "Failed to fetch products" };
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}
