import React from "react";
import { visualTokens } from "../../config/visual";

interface SectionDividerProps {
  /**
   * Optional label to display above the divider.
   * Useful for distinguishing between "Building" and "Scripting" sections.
   */
  label?: string;
}

/**
 * Visual separator between major sections.
 * Uses centralized visual tokens for consistent appearance across themes.
 */
const SectionDivider: React.FC<SectionDividerProps> = ({ label }) => {
  return (
    <div className="py-[80px] lg:py-[120px] flex flex-col items-center justify-center">
      {label && (
        <p className="text-[12px] font-semibold uppercase tracking-widest text-gray-mid dark:text-gray-textDark mb-[20px] transition-colors">
          {label}
        </p>
      )}
      <div className={`h-[1px] w-[60px] ${visualTokens.borders.separator.both}`} />
    </div>
  );
};

export default SectionDivider;
