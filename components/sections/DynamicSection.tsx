import React from "react";
import { SectionConfig } from "../../types";
import SectionWrapper from "../core/SectionWrapper";
import SplitLayout from "../core/SplitLayout";
import DetailLayout from "../core/DetailLayout";

interface DynamicSectionProps {
  config: SectionConfig;
}

const DynamicSection: React.FC<DynamicSectionProps> = ({ config }) => {
  return (
    <SectionWrapper id={config.id} title={config.title}>
      <div className="flex flex-col">
        {config.items.map((item) => {
          if (config.layout === "split") {
            return <SplitLayout key={item.id} item={item} />;
          }
          if (config.layout === "detail") {
            return <DetailLayout key={item.id} item={item} />;
          }
          return null;
        })}
      </div>
    </SectionWrapper>
  );
};

export default DynamicSection;
