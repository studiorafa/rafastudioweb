import React from "react";
import { siteConfig } from "../config/siteConfig";
import { visualTokens } from "../config/visual";

const ContactSection = () => {
  const { contact } = siteConfig;
  
  return (
    <section id="contact" className="w-full pb-[180px] scroll-mt-[120px]">
      <h2 className="text-[36px] lg:text-[52px] font-semibold leading-[1.1] tracking-[-0.03em] text-black dark:text-white mb-[60px] transition-colors">
        Contact
      </h2>

      <div className="flex flex-col gap-[48px] max-w-[700px]">
        {/* Header statement */}
        <div className="text-[18px] lg:text-[20px] font-semibold text-black dark:text-white leading-[1.6] tracking-[-0.01em]">
          {contact.header}
        </div>

        {/* Prerequisites + hype */}
        <div className="space-y-[20px]">
          <p className="text-[16px] lg:text-[18px] font-normal leading-[1.7] text-black dark:text-gray-200 transition-colors">
            {contact.prerequisites}
          </p>
          <p className="text-[16px] lg:text-[18px] font-semibold text-black dark:text-white leading-[1.7] transition-colors">
            {contact.hype}
          </p>
        </div>

        {/* Contact CTA */}
        <div className={`pt-[24px] border-t ${visualTokens.borders.separator.both}`}>
          <a 
            href={`mailto:${contact.email}?subject=Project%20Inquiry`}
            className="inline-flex items-center gap-[8px] px-[20px] py-[12px] bg-black dark:bg-white text-white dark:text-black font-semibold text-[16px] hover:opacity-80 transition-opacity"
          >
            Start a Conversation
            <span className="text-[18px]">→</span>
          </a>

          {/* Contact info */}
          <div className="mt-[32px] space-y-[8px]">
            <div className="text-[16px] font-medium text-gray-mid dark:text-gray-textDark">
              {contact.email}
            </div>
            <div className="text-[14px] text-gray-mid dark:text-gray-textDark">
              {contact.timezone}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
