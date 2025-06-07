import ProductCard from "@/components/shared/card/product-card";
import { getProducts } from "@/lib/actions/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <p className="text-gray-600">{products.length} products found</p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const imageUrl = `${product.featured.url}`;
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                imageUrl={imageUrl}
                slug={product.slug}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
