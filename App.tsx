import React from "react";
import Navbar from "./components/Navbar";
import IntroSection from "./components/IntroSection";
import ContactSection from "./components/ContactSection";
import DynamicSection from "./components/sections/DynamicSection";
import { ThemeProvider } from "./context/ThemeContext";
import { siteConfig } from "./config/siteConfig";

export default function App() {
  return (
    <ThemeProvider>
      <main className="w-full bg-white dark:bg-black min-h-screen text-black dark:text-white antialiased transition-colors duration-300">
        <Navbar />
        
        {/* 
          Main Container
          Vertical spacing is consistent: 120px (mobile) / 180px (desktop)
        */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20 flex flex-col gap-[120px] lg:gap-[180px]">
          
          <IntroSection />
          
          {/* Loop through sections defined in config */}
          {siteConfig.sections.map((section) => (
            <DynamicSection key={section.id} config={section} />
          ))}

          <ContactSection />
          
        </div>
      </main>
    </ThemeProvider>
  );
}
