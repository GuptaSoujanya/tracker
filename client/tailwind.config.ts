import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'urbanist': ['var(--font-urbanist)', 'Urbanist', 'sans-serif'],
        'spectral': ['var(--font-spectral)', 'Spectral', 'serif'],
        'sans': ['var(--font-urbanist)', 'Urbanist', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Primary - Sophisticated Blue for main actions
        primary: {
          DEFAULT: "#4F7CFF", // Softer blue
          50: "#F0F4FF",
          100: "#E0EAFF",
          200: "#C7D7FE",
          300: "#A4BFFC",
          400: "#7FA2F9",
          500: "#4F7CFF",
          600: "#3D5FE3",
          700: "#2D47C7",
          800: "#1E32AB",
          900: "#0F1E8F",
          950: "#070F73",
          foreground: "#FFFFFF",
        },
        
        // Secondary - Elegant Teal/Cyan
        secondary: {
          DEFAULT: "#06B6D4", // Calm cyan
          50: "#F0FDFF",
          100: "#CCFBFF",
          200: "#99F6FF",
          300: "#5CE9FB",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
          950: "#0A3847",
          foreground: "#FFFFFF",
        },
        
        // Success - Soft Mint Green
        success: {
          DEFAULT: "#10B981", // Balanced green
          50: "#F0FDF9",
          100: "#CCFBEF",
          200: "#99F6E0",
          300: "#5FE9D0",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
          950: "#0A3A38",
          foreground: "#FFFFFF",
        },
        
        // Warning - Warm Amber (more subtle)
        warning: {
          DEFAULT: "#F59E0B", // Softer amber
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          950: "#5A2A0A",
          foreground: "#FFFFFF",
        },
        
        // Danger - Softer Red/Pink
        danger: {
          DEFAULT: "#F87171", // Lighter red
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          950: "#5A1414",
          foreground: "#FFFFFF",
        },
        
        // Info - Soft Purple/Lavender
        info: {
          DEFAULT: "#A78BFA", // Softer purple
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D5FF",
          300: "#D8B4FE",
          400: "#C084FC",
          500: "#A78BFA",
          600: "#9333EA",
          700: "#7E22CE",
          800: "#6B21A8",
          900: "#581C87",
          950: "#3B0764",
          foreground: "#FFFFFF",
        },
        
        // Archive - Subtle Gray
        archive: {
          DEFAULT: "#9CA3AF", // Lighter gray
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#252A33",
          900: "#1A1D24",
          950: "#0F1115",
          foreground: "#FFFFFF",
        },
        
        // Budget - Refined Indigo
        budget: {
          DEFAULT: "#818CF8", // Softer indigo
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          950: "#1E1B4B",
          foreground: "#FFFFFF",
        },
        
        // Target - Soft Coral/Orange
        target: {
          DEFAULT: "#FB923C", // Warmer orange
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
          950: "#5A1F0A",
          foreground: "#FFFFFF",
        },
        
        // Neutral - Refined Gray scale with better contrast
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#2A2A2A",
          900: "#1C1C1C",
          950: "#0F0F0F",
        },
        
        // Chart colors - More harmonious palette
        chart: {
          1: "#4F7CFF", // Blue
          2: "#10B981", // Green
          3: "#F59E0B", // Amber
          4: "#F87171", // Red
          5: "#A78BFA", // Purple
          6: "#EC4899", // Pink
          7: "#06B6D4", // Cyan
          8: "#FB923C", // Orange
        },
        
        accent: {
          DEFAULT: "#A78BFA",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#2A2A2A",
          foreground: "#9CA3AF",
        },
        destructive: {
          DEFAULT: "#F87171",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#1C1C1C",
          foreground: "#FAFAFA",
        },
        card: {
          DEFAULT: "#1C1C1C",
          foreground: "#FAFAFA",
        },
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "500", // medium bold
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      fontSize: {
        "title-1": ["72px", { lineHeight: "88px", letterSpacing: "-0.8px" }],
        "title-2": ["64px", { lineHeight: "76px", letterSpacing: "-0.8px" }],
        "title-3": ["56px", { lineHeight: "68px", letterSpacing: "-0.6px" }],
        h1: ["56px", { lineHeight: "68px", letterSpacing: "-0.5px" }],
        h2: ["48px", { lineHeight: "58px", letterSpacing: "-0.4px" }],
        h3: ["40px", { lineHeight: "48px", letterSpacing: "-0.3px" }],
        h4: ["32px", { lineHeight: "38px", letterSpacing: "-0.2px" }],
        h5: ["24px", { lineHeight: "30px", letterSpacing: "-0.15px" }],
        h6: ["20px", { lineHeight: "24px", letterSpacing: "0px" }],
        "label-1": ["16px", { lineHeight: "22px", letterSpacing: "-0.18px" }],
        "label-2": ["14px", { lineHeight: "20px", letterSpacing: "-0.16px" }],
        "label-3": ["12px", { lineHeight: "16px", letterSpacing: "-0.12px" }],
        "body-1": ["18px", { lineHeight: "28px", letterSpacing: "0px" }],
        "body-2": ["16px", { lineHeight: "24px", letterSpacing: "0px" }],
        "body-3": ["14px", { lineHeight: "20px", letterSpacing: "0px" }],
        "body-4": ["12px", { lineHeight: "16px", letterSpacing: "0px" }],
        "caption-1": ["10px", { lineHeight: "12px", letterSpacing: "0px" }],
        "caption-2": ["9px", { lineHeight: "10px", letterSpacing: "0px" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)" },
          "50%": { boxShadow: "0 0 30px rgba(37, 99, 235, 0.8)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "glow": "glow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
