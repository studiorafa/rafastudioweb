export type LayoutType = "split" | "detail";

export interface ContentPair {
  label: string;
  text: string;
}

export interface SectionItem {
  id: string;
  title: string;
  // Split Layout Props
  description?: string;
  meta?: string;
  imageUrl?: string;
  // Detail Layout Props
  contentPairs?: ContentPair[];
  codeSnippet?: string;
}

export interface SectionConfig {
  id: string;
  navLabel: string;
  title: string;
  layout: LayoutType;
  items: SectionItem[];
}

export interface IntroConfig {
  name: string;
  tagline: string;
}

export interface ContactConfig {
  header: string;
  prerequisites: string;
  hype: string;
  email: string;
  timezone: string;
}

export interface SiteConfig {
  intro: IntroConfig;
  sections: SectionConfig[];
  contact: ContactConfig;
}
