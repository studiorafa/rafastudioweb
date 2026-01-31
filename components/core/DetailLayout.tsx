import React from "react";
import { SectionItem } from "../../types";

interface DetailLayoutProps {
  item: SectionItem;
}

const DetailLayout: React.FC<DetailLayoutProps> = ({ item }) => {
  return (
    <article className="flex flex-col items-start w-full max-w-[800px] mb-[80px] last:mb-0">
      <h3 className="text-[18px] font-semibold text-black dark:text-white tracking-[-0.01em] mb-[16px] transition-colors">
        {item.title}
      </h3>

      {/* Generic Content Pairs (Problem/Solution/Etc) */}
      <div className="mb-[24px] space-y-4">
        {item.contentPairs?.map((pair, index) => (
          <p key={index} className="text-[16px] leading-[1.5] text-black dark:text-gray-200 transition-colors">
            <span className="font-medium text-black/40 dark:text-white/40 mr-2">{pair.label}:</span>
            {pair.text}
          </p>
        ))}
      </div>

      {/* Optional Code Block */}
      {item.codeSnippet && (
        <div className="w-full max-w-[600px] bg-gray-light dark:bg-gray-dark p-[24px] rounded-none mt-2 transition-colors">
          <pre className="font-mono text-[13px] lg:text-[14px] leading-relaxed text-black dark:text-gray-200 whitespace-pre-wrap break-words overflow-x-auto">
            <code>{item.codeSnippet}</code>
          </pre>
        </div>
      )}
    </article>
  );
};

export default DetailLayout;
