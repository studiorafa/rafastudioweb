/**
 * Centralized visual tokens for consistent theming across light/dark modes.
 * All opacity values are normalized to ensure borders appear equally subtle in both themes.
 */

export const visualTokens = {
  borders: {
    // Item separators and dividers
    separator: {
      light: "border-black/4",      // Very faint on light background
      dark: "border-white/4",       // Matching subtle appearance on dark
      both: "border-black/4 dark:border-white/4",
    },
    // Code blocks and secondary elements
    tertiary: {
      light: "border-black/5",
      dark: "border-white/5",
      both: "border-black/5 dark:border-white/5",
    },
  },

  spacing: {
    // Section gaps
    sectionGap: "gap-[120px] lg:gap-[180px]",
    // Item spacing
    itemSpacing: "mb-[120px] lg:mb-[160px]",
    // Item padding top (separates items)
    itemPaddingTop: "pt-[120px] lg:pt-[160px]",
    // Section header spacing
    sectionHeaderSpacing: "mb-[100px] lg:mb-[140px]",
  },

  transitions: {
    color: "transition-colors",
    all: "transition-all duration-300",
  },
} as const;
