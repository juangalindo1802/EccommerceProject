"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const PLACEHOLDER = "https://images.unsplash.com/photo-1518770660439-4636190af475";

export function ImageFallback({ src, alt, ...props }: ImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={() => {
        if (typeof imageSrc !== "string" || imageSrc === PLACEHOLDER) return;
        setImageSrc(PLACEHOLDER);
      }}
    />
  );
}

