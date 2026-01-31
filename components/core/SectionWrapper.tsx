import React from "react";

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="w-full">
      {/* Header: 48px/32px, left-aligned */}
      <h2 className="text-[32px] lg:text-[48px] font-semibold leading-[1.1] tracking-[-0.03em] text-black dark:text-white mb-[80px] lg:mb-[120px] transition-colors">
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
