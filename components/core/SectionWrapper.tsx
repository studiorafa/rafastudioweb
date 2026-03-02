import React from "react";

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="w-full scroll-mt-[120px]">
      {/* Header: 48px/32px, left-aligned, with bottom breathing room */}
      <h2 className="text-[36px] lg:text-[52px] font-semibold leading-[1.1] tracking-[-0.03em] text-black dark:text-white mb-[100px] lg:mb-[140px] transition-colors">
        {title}
      </h2>
      
      {/* Content Container */}
      <div className="w-full">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
