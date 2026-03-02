import React from "react";
import { SectionItem } from "../../types";
import ImageGallery from "./ImageGallery";
import { visualTokens } from "../../config/visual";

interface SplitLayoutProps {
  item: SectionItem;
  index?: number;
}

const SplitLayout: React.FC<SplitLayoutProps> = ({ item, index = 0 }) => {
  const isReversed = index % 2 === 1;
  const isFeatured = item.importance === "featured";
  
  const aspectRatios = {
    featured: "lg:aspect-[4/3]",
    secondary: "lg:aspect-video",
    tertiary: "aspect-[5/4]"
  };

  const textSizes = {
    featured: {
      title: "text-[24px]",
      description: "text-[16px] max-w-[600px]",
      meta: "text-[14px] mb-[24px]",
      statMetric: "text-[18px]",
      statContext: "text-[14px]"
    },
    secondary: {
      title: "text-[20px]",
      description: "text-[16px] mb-[20px]",
      meta: "text-[14px] mb-[20px]",
      statMetric: "text-[14px]",
      statContext: "text-[13px]"
    }
  };

  const sizes = isFeatured ? textSizes.featured : textSizes.secondary;
  const imageWidth = isFeatured ? "lg:w-full" : "lg:w-[62%]";
  const infoWidth = isFeatured ? "w-full" : "lg:w-[32%]";
  const mtSpacing = isFeatured ? "mt-[24px]" : "";
  
  // Determine image source: prefer imageUrls (array), fall back to imageUrl (string)
  const imageSources = item.imageUrls || (item.imageUrl ? [item.imageUrl] : []);

  return (
    <article className={`flex flex-col gap-[32px] lg:gap-[8%] ${visualTokens.spacing.itemSpacing} ${visualTokens.spacing.itemPaddingTop} ${visualTokens.borders.separator.both} first:border-t-0 first:pt-0 last:mb-0 ${
      isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
    }`}>
      {/* Image: Varies by importance, supports single or multiple images */}
      <div className={`w-full ${imageWidth}`}>
        <ImageGallery 
          images={imageSources}
          alt={`Visual for ${item.title}`}
          aspectClassName={aspectRatios[item.importance || 'secondary']}
          importance={item.importance}
        />
      </div>

      {/* Info: Unified layout with config-driven sizing */}
      <div className={`${infoWidth} flex flex-col items-start justify-start ${mtSpacing}`}>
        <h3 className={`${sizes.title} font-semibold text-black dark:text-white tracking-[-0.02em] mb-[16px] transition-colors`}>
          {item.title}
        </h3>
        
        <p className={`${sizes.description} font-normal leading-[1.6] text-black dark:text-gray-200 transition-colors`}>
          {item.description}
        </p>

        {item.meta && (
          <div className={`${sizes.meta} font-medium leading-[1.5] text-gray-mid dark:text-gray-textDark transition-colors`}>
            {item.meta}
          </div>
        )}

        {item.stats && (
          <div className={`pt-[16px] ${visualTokens.borders.separator.both} w-full`}>
            <div className={`${sizes.statMetric} font-semibold text-black dark:text-white`}>
              {item.stats.metric}
            </div>
            <div className={`${sizes.statContext} text-gray-mid dark:text-gray-textDark mt-[2px]`}>
              {item.stats.context}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default SplitLayout;
