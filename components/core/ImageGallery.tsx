import React, { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  aspectClassName?: string;
  importance?: "featured" | "secondary" | "tertiary";
}

/**
 * Multi-image gallery component.
 * Supports responsive stacking with automatic aspect-ratio preservation.
 * Images overlay each other with manual navigation via keyboard or transparent overlays.
 */
const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  alt, 
  aspectClassName = "aspect-video",
  importance = "secondary"
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  // Single image: render as normal
  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={alt}
        className={`w-full h-auto object-cover ${aspectClassName} bg-gray-200 dark:bg-gray-800`}
        loading="lazy"
      />
    );
  }

  // Multiple images: stacked overlay with navigation
  return (
    <div
      className={`relative w-full overflow-hidden bg-gray-200 dark:bg-gray-800 ${aspectClassName}`}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          setActiveIndex((i) => (i + 1) % images.length);
        } else if (e.key === "ArrowLeft") {
          setActiveIndex((i) => (i - 1 + images.length) % images.length);
        }
      }}
      tabIndex={0}
      role="region"
      aria-label={`Image gallery: ${activeIndex + 1} of ${images.length}`}
    >
      {/* Image Stack */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`${alt} - Image ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Navigation: Dot indicators */}
      <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex gap-[6px] z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-[8px] h-[8px] rounded-full transition-all ${
              index === activeIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`View image ${index + 1}`}
            aria-pressed={index === activeIndex}
          />
        ))}
      </div>

      {/* Navigation: Side hints (mobile-friendly) */}
      {images.length > 1 && (
        <>
          <div
            className="absolute left-0 top-0 bottom-0 w-[20%] cursor-pointer hover:bg-black/5 transition-colors z-5"
            onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
            aria-label="Previous image"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-[20%] cursor-pointer hover:bg-black/5 transition-colors z-5"
            onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
            aria-label="Next image"
          />
        </>
      )}

      {/* Counter label (optional, small text) */}
      {images.length > 1 && (
        <div className="absolute top-[12px] right-[12px] text-[12px] font-semibold text-white bg-black/40 px-[8px] py-[4px] rounded-sm pointer-events-none">
          {activeIndex + 1}/{images.length}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
