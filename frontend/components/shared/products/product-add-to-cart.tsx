import { Button } from "@/components/ui/button";

export default function ProductAddToCart({ price }: { price: number }) {
  return (
    <div className="flex gap-4">
      <Button size="lg" className="flex-1">
        Add to Cart - ${price}
      </Button>
      <Button variant="outline" size="lg">
        ♡
      </Button>
    </div>
  );
}
