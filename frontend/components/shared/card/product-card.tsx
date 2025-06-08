import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string | number;
  title: string;
  price: number;
  imageUrl: string;
  slug: string;
}

export default function ProductCard({
  id,
  title,
  price,
  imageUrl,
  slug,
}: ProductCardProps) {
  return (
    <Card
      key={id}
      className="group hover:shadow-lg transition-shadow duration-300 animate-fade-in p-0"
    >
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden relative">
          <Image
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            fill
            priority
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">${price}</p>
          <Link href={`/product/${slug}`}>
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
