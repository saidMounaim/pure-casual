import Image from "next/image";

export default function ProductImages({
  featured,
  images,
  title,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  featured: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[];
  title: string;
}) {
  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg relative">
        <Image
          src={featured.url}
          alt={title}
          className="w-full h-full object-cover object-top"
          fill
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          images.slice(1).map((image: any) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Image
                src={image.url}
                alt={image.url}
                className="w-full h-full object-cover"
                fill
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}
