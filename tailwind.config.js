/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./context/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
    "./backend/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#0B0617",
        primary: "#00C3FF",
        secondary: "#CE31FF",
        highlight: "#FF2DAF",
        warning: "#FFA928",
        gradient1: "#00C3FF",
        gradient2: "#FF2DAF",
        textPrimary: "#FFFFFF",
        textSecondary: "rgba(255, 255, 255, 0.7)",
        textDisabled: "rgba(255, 255, 255, 0.4)",
        dark: "#042222", // Rich Black
        darkLight: "#093535", // Rich Black
        light: "#F8FBFF", // Light Blue
        deepLight: "#DDE6F0",
        offwhite: "#FFE4D0", // Snow
        lightGray: "#E2E8F0",
        white: "#FFFFFF",
        black: "#000000",
        error: "#FF5252",
        gray: "#94A3B8",
      },
    },
  },

  plugins: [],
};
