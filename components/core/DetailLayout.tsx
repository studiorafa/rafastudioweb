import React, { useEffect } from "react";
import { SectionItem } from "../../types";
import { visualTokens } from "../../config/visual";

interface DetailLayoutProps {
  item: SectionItem;
}

const DetailLayout: React.FC<DetailLayoutProps> = ({ item }) => {
  useEffect(() => {
    // Highlight code blocks after component mounts
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, [item.codeSnippet]);

  return (
    <article className="flex flex-col items-start w-full max-w-[800px] mb-[100px] last:mb-0">
      <h3 className="text-[22px] font-semibold text-black dark:text-white tracking-[-0.02em] mb-[24px] transition-colors">
        {item.title}
      </h3>

      {/* Generic Content Pairs (Problem/Solution/Etc) */}
      <div className="mb-[32px] space-y-[20px] w-full">
        {item.contentPairs?.map((pair, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-[12px] sm:gap-[24px]">
            <span className="font-semibold text-[14px] text-black dark:text-white min-w-[80px] flex-shrink-0 uppercase tracking-wider">
              {pair.label}
            </span>
            <p className="text-[16px] leading-[1.6] text-black dark:text-gray-200 transition-colors flex-1">
              {pair.text}
            </p>
          </div>
        ))}
      </div>

      {/* Optional Code Block with Syntax Highlighting */}
      {item.codeSnippet && (
        <div className={`w-full bg-gray-light dark:bg-[#1e1e1e] p-[24px] rounded-none mt-[8px] border ${visualTokens.borders.tertiary.both} ${visualTokens.transitions.color} overflow-hidden`}>
          <pre className="font-mono text-[13px] leading-[1.6] whitespace-pre-wrap break-words overflow-x-auto">
            <code className="language-lua" dangerouslySetInnerHTML={{ __html: item.codeSnippet }}>
            </code>
          </pre>
        </div>
      )}
    </article>
  );
};

export default DetailLayout;
