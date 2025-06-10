"use server";

export async function getProducts(sort?: string) {
  try {
    let sortParam = "";

    switch (sort) {
      case "price-low":
        sortParam = "price:asc";
        break;
      case "price-high":
        sortParam = "price:desc";
        break;
      case "name":
        sortParam = "title:asc";
        break;
      case "newest":
        sortParam = "createdAt:desc";
        break;
      default:
        sortParam = "createdAt:desc";
    }

    const res = await fetch(
      `${
        process.env.STRAPI_URL
      }/api/products?populate=*&sort=${encodeURIComponent(sortParam)}`,
      {
        next: { revalidate: 60 },
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: "Failed to fetch products" };
    }

    return data.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

export async function getFeaturedProducts() {
  try {
    const res = await fetch(
      `${process.env.STRAPI_URL}/api/products?pagination[limit]=3&populate=*`,
      {
        next: { revalidate: 60 },
      }
    );

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
        next: { revalidate: 60 },
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
