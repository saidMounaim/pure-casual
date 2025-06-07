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

// single product
export async function getProductBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return { success: false, message: "Failed to fetch product" };
    }

    const data = await res.json();

    return data.data[0] || null;
  } catch (err) {
    console.error("Error fetching product:", err);
    return null;
  }
}
