import React from "react";
import { siteConfig } from "../config/siteConfig";

const ContactSection = () => {
  const { contact } = siteConfig;
  
  return (
    <section id="contact" className="w-full pb-[180px]">
      <h2 className="text-[32px] lg:text-[48px] font-semibold leading-[1.1] tracking-[-0.03em] text-black dark:text-white mb-[48px] transition-colors">
        Contact
      </h2>

      <div className="text-[16px] lg:text-[18px] font-normal leading-[1.6] tracking-[-0.01em] text-black dark:text-gray-200 max-w-[600px] transition-colors">
        <p className="mb-[48px]">
          {contact.header}
        </p>

        <p className="mb-[48px]">
          {contact.prerequisites} <span className="text-black dark:text-white font-medium">{contact.hype}</span>
        </p>

        <div className="mb-[12px]">
            <a 
                href={`mailto:${contact.email}`} 
                className="text-[18px] font-medium text-black dark:text-white hover:underline decoration-1 underline-offset-4 transition-colors"
            >
                {contact.email}
            </a>
        </div>
        <div className="text-[16px] text-gray-mid dark:text-gray-textDark transition-colors">
          {contact.timezone}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
