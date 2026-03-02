import React from "react";
import { SectionConfig } from "../../types";
import SectionWrapper from "../core/SectionWrapper";
import SplitLayout from "../core/SplitLayout";
import DetailLayout from "../core/DetailLayout";
import SectionDivider from "../core/SectionDivider";

interface DynamicSectionProps {
  config: SectionConfig;
  isNotFirstSection?: boolean; // Controls divider appearance
}

const DynamicSection: React.FC<DynamicSectionProps> = ({ config, isNotFirstSection = false }) => {
  return (
    <>
      {/* Visual separator between section groups (e.g., Building → Scripting) */}
      {isNotFirstSection && <SectionDivider label={config.navLabel} />}
      
      <SectionWrapper id={config.id} title={config.title}>
        <div className="flex flex-col">
          {config.items.map((item, index) => {
            if (config.layout === "split") {
              return <SplitLayout key={item.id} item={item} index={index} />;
            }
            if (config.layout === "detail") {
              return <DetailLayout key={item.id} item={item} />;
            }
            return null;
          })}
        </div>
      </SectionWrapper>
    </>
  );
};

export default DynamicSection;
