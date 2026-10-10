import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#161616",
          light: "#fffdf9",
          accent: "#b98b6e",
          primary: "#161616",
        },
        surface: {
          DEFAULT: "#fffdf9",
          dim: "#f4f0e9",
          container: "#eee8df",
          highest: "#b9aea2",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "1.25rem",
        xl: "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
