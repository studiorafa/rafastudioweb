import React from "react";
import { SectionItem } from "../../types";

interface SplitLayoutProps {
  item: SectionItem;
}

const SplitLayout: React.FC<SplitLayoutProps> = ({ item }) => {
  return (
    <article className="flex flex-col lg:flex-row w-full gap-[24px] lg:gap-[5%] mb-[120px] last:mb-0">
      {/* Left: Image (60% width on desktop) */}
      <div className="w-full lg:w-[60%]">
        <img 
          src={item.imageUrl} 
          alt={`Visual for ${item.title}`}
          className="w-full h-auto object-cover aspect-video lg:aspect-[3/2] bg-gray-200 dark:bg-gray-800 transition-colors"
          loading="lazy"
        />
      </div>

      {/* Right: Info (35% width on desktop) */}
      <div className="w-full lg:w-[35%] flex flex-col items-start pt-2 lg:pt-0">
        <h3 className="text-[18px] font-semibold text-black dark:text-white tracking-[-0.01em] mb-[12px] transition-colors">
          {item.title}
        </h3>
        
        <p className="text-[16px] font-normal leading-[1.5] text-black dark:text-gray-200 mb-[16px] transition-colors">
          {item.description}
        </p>

        {item.meta && (
          <div className="text-[14px] lg:text-[15px] font-medium leading-[1.4] text-gray-mid dark:text-gray-textDark transition-colors">
            {item.meta}
          </div>
        )}
      </div>
    </article>
  );
};

export default SplitLayout;
