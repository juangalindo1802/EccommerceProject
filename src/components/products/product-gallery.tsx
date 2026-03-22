"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  name: string;
  images: string[];
};

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="relative h-[360px] overflow-hidden rounded-3xl border border-border/70 bg-card sm:h-[460px]">
        <Image src={selectedImage} alt={name} fill className="object-cover" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            className={cn(
              "relative h-24 overflow-hidden rounded-2xl border transition-all",
              selectedImage === image
                ? "border-primary ring-2 ring-primary/20"
                : "border-border/70 opacity-80 hover:opacity-100",
            )}
            onClick={() => setSelectedImage(image)}
            aria-label={`Vista ${index + 1} de ${name}`}
            type="button"
          >
            <Image src={image} alt={`${name} vista ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

