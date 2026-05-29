import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: "0 0 35px rgba(245, 196, 81, 0.28)",
        "glow-strong": "0 0 72px rgba(245, 196, 81, 0.28), 0 0 48px rgba(167, 139, 250, 0.18)",
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
        "grid-large":
          "linear-gradient(rgba(245, 196, 81, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(167, 139, 250, 0.08) 1px, transparent 1px)",
        "aurora-field":
          "radial-gradient(ellipse at 16% 20%, rgba(245, 196, 81, 0.22), transparent 36%), radial-gradient(ellipse at 80% 18%, rgba(167, 139, 250, 0.17), transparent 35%), radial-gradient(ellipse at 26% 82%, rgba(56, 189, 248, 0.12), transparent 42%), radial-gradient(ellipse at 74% 84%, rgba(251, 113, 133, 0.12), transparent 42%), linear-gradient(135deg, #050403 0%, #100b05 45%, #07050a 100%)",
      },
      keyframes: {
        "aurora-shift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(-2%, 1%, 0) rotate(2deg)" },
        },
        "grid-drift": {
          "0%": { backgroundPosition: "0 0, 0 0" },
          "100%": { backgroundPosition: "80px 80px, 80px 80px" },
        },
        "pulse-border": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.92" },
        },
        "scan": {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(120%)" },
        },
        "float-soft": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
        },
      },
      animation: {
        "aurora-shift": "aurora-shift 18s ease-in-out infinite",
        "grid-drift": "grid-drift 18s linear infinite",
        "pulse-border": "pulse-border 3.2s ease-in-out infinite",
        "scan": "scan 6s linear infinite",
        "float-soft": "float-soft 7s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};
