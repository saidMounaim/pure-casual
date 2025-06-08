import EditorJsRenderer from "@/components/shared/editor-js-renderer";
import ProductAddToCart from "@/components/shared/products/product-add-to-cart";
import ProductImages from "@/components/shared/products/product-images";
import ProductSizeSelect from "@/components/shared/products/product-size-select";
import ProductWishListButton from "@/components/shared/products/product-wishlist-button";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug } from "@/lib/actions/products";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SingleProduct({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-900">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ProductImages
            featured={product.featured}
            images={product.images}
            title={product.title}
          />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category.name}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product.salePrice ? product.salePrice : product.price}
                </span>
                <Badge variant="destructive">Sale</Badge>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  {/* {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))} */}
                </div>
                <span className="text-sm text-gray-600">
                  {/* ({product.reviews} reviews) */}
                </span>
                <ProductWishListButton product={product} />
              </div>
            </div>
            <div>
              <EditorJsRenderer data={product.description} />
            </div>
            {/* Size Selection */}
            <ProductSizeSelect
              sizes={product.sizes}
              productId={product.documentId}
            />

            {/* Add to Cart */}
            <ProductAddToCart
              price={product.price}
              productId={product.documentId}
              slug={product.slug}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
