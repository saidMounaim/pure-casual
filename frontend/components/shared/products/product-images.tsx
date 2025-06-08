"use client";

import { useState } from "react";

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
  const allImages = [
    { ...featured, id: featured.id || "featured" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...images.filter((img: any) => img.url !== featured.url),
  ];

  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image Slider */}
      <div className="aspect-square overflow-hidden rounded-lg relative">
        <img
          src={allImages[current].url}
          alt={title}
          className="w-full h-full object-cover object-top"
        />
        {/* Slider Controls */}
        {allImages.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white transition"
              onClick={() =>
                setCurrent((prev) =>
                  prev === 0 ? allImages.length - 1 : prev - 1
                )
              }
              aria-label="Previous image"
              type="button"
            >
              &#8592;
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white transition"
              onClick={() =>
                setCurrent((prev) =>
                  prev === allImages.length - 1 ? 0 : prev + 1
                )
              }
              aria-label="Next image"
              type="button"
            >
              &#8594;
            </button>
          </>
        )}
      </div>
      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-4">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          allImages.map((image: any, idx: number) => (
            <div
              key={image.id || idx}
              className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity border-2 ${
                idx === current ? "border-black" : "border-transparent"
              }`}
              onClick={() => setCurrent(idx)}
            >
              <img
                src={image.url}
                alt={image.id}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}
