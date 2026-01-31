import React, { useEffect, useState } from "react";
import { siteConfig } from "../config/siteConfig";

const IntroSection = () => {
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="intro" className="pt-[140px] lg:pt-[180px] flex flex-col items-start min-h-[60vh] relative">
      <div className="mb-[24px] h-12 lg:h-16">
        <img src="/assets/primary.png" alt={siteConfig.intro.name} className="h-full object-contain" />
      </div>

      <p className="text-[16px] lg:text-[18px] font-normal leading-[1.6] tracking-[-0.01em] text-black dark:text-gray-200 max-w-[600px] transition-colors">
        {siteConfig.intro.tagline}
      </p>

      <div 
        className={`hidden lg:block fixed bottom-12 left-1/2 -translate-x-1/2 text-[24px] text-black dark:text-white transition-opacity duration-300 ${showArrow ? 'opacity-30 animate-pulse' : 'opacity-0 pointer-events-none'}`}
      >
        ↓
      </div>
    </section>
  );
};

export default IntroSection;
