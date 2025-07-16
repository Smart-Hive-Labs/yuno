export type AppThemeColors = {
  background: string;
  primary: string;
  secondary: string;
  highlight: string;
  warning: string;
  gradient1: string;
  gradient2: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  dark: string;
  darkLight: string;
  light: string;
  deepLight: string;
  offwhite: string;
  lightGray: string;
  white: string;
  black: string;
  error: string;
  gray: string;
};

export const Colors: AppThemeColors = {
  background: "#0B0617", // Dark background
  primary: "#00C3FF", // Sky Blue (Primary Buttons, Active Tab)
  secondary: "#CE31FF", // Purple (Secondary Buttons)
  highlight: "#FF2DAF", // Pink (Likes, Glow Animations)
  warning: "#FFA928", // Orange (Alerts, Warnings)
  gradient1: "#00C3FF", // Gradient Start
  gradient2: "#FF2DAF", // Gradient End
  textPrimary: "#FFFFFF", // Main readable text
  textSecondary: "rgba(255, 255, 255, 0.7)", // Subtext
  textDisabled: "rgba(255, 255, 255, 0.4)", // Disabled text

  dark: "#042222", // Rich black (e.g. cards on dark mode)
  darkLight: "#093535", // Slightly lighter dark (e.g. tab bar)

  light: "#F8FBFF", // App background in light mode
  deepLight: "#DDE6F0", // Panels, dropdowns in light mode
  offwhite: "#FFE4D0", // Warm backgrounds
  lightGray: "#E2E8F0", // Borders, inactive tab, etc.

  white: "#FFFFFF", // Always white
  black: "#000000", // Always black
  error: "#FF5252", // Red for form errors, toasts
  gray: "#94A3B8", // Icons, descriptions
};
