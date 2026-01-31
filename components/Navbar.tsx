import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { siteConfig } from "../config/siteConfig";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Dynamically observe all sections defined in config + contact
    const sectionIds = [...siteConfig.sections.map(s => s.id), "contact"];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const NavLink = ({ label, id }: { label: string; id: string }) => {
    const isActive = activeSection === id;
    
    return (
      <button
        onClick={() => scrollToSection(id)}
        className={`text-[16px] transition-all hover:underline underline-offset-4 ${
          isActive 
            ? "font-semibold text-black dark:text-white underline decoration-2" 
            : "font-medium text-black dark:text-white"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center py-6 px-6 bg-white dark:bg-black border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="flex items-center w-full max-w-[1200px] relative justify-between lg:justify-center">
        
        {/* Logo */}
        <div className="lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:mr-16">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="h-8 transition-opacity hover:opacity-80"
            aria-label="Rafa Studio Logo"
          >
            <img src="/assets/primary.png" alt="Rafa Studio" className="h-full object-contain" />
          </button>
        </div>

        {/* Desktop Links (Dynamic) */}
        <div className="hidden lg:flex gap-10">
          {siteConfig.sections.map((section) => (
            <NavLink key={section.id} label={section.navLabel} id={section.id} />
          ))}
          <NavLink label="Contact" id="contact" />
        </div>

        {/* Mobile Links (Dynamic) */}
        <div className="lg:hidden flex gap-4 mr-4">
           {siteConfig.sections.map((section) => (
             <button 
                key={section.id}
                onClick={() => scrollToSection(section.id)} 
                className="text-sm font-medium hover:underline underline-offset-4 transition-all"
             >
                {/* Shorten label for mobile if needed, or use full label */}
                {section.navLabel}
             </button>
           ))}
           <button onClick={() => scrollToSection("contact")} className="text-sm font-medium hover:underline underline-offset-4 transition-all">Contact</button>
        </div>

        {/* Theme Toggle */}
        <div className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:ml-16">
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {theme === "light" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41-1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
