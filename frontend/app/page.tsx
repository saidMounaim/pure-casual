import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFeaturedProducts } from "@/lib/actions/products";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            Welcome to Pure Casual
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Discover the latest trends in fashion
          </p>
          <Link href="/products">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${product.featured.url}`;

              return (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-shadow duration-300 animate-fade-in p-0"
                >
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden relative">
                      <Image
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        fill
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 mb-4">${product.price}</p>
                      <Link href={`/product/${product.slug}`}>
                        <Button className="w-full">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest updates on new products and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900"
            />
            <Button className="bg-white text-gray-900 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
