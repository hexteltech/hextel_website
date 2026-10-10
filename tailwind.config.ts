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
          dark: "#5C1F1F",
          light: "#EDE9E1",
          accent: "#B88849",
          primary: "#5C1F1F",
        },
        surface: {
          DEFAULT: "#EDE9E1",
          dim: "#E3DDD3",
          container: "#DCD5C8",
          highest: "#C8BEAD",
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
