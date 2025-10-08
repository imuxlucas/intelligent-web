import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "rgba(255, 255, 255, 1)",
          secondary: "rgba(0, 0, 0, 0.04)",
          light: "rgba(245, 245, 245, 1)",
        },
        fg: {
          opposite: "rgba(255, 255, 255, 1)",
          primary: "rgba(0, 0, 0, 1)",
          secondary: "rgba(0, 0, 0, 0.8)",
          tertiary: "rgba(0, 0, 0, 0.6)",
          disabled: "rgba(0, 0, 0, 0.4)",
        },
        error: {
          default: "rgba(240, 80, 80, 1)",
          hover: "rgba(224, 72, 72, 1)",
          active: "rgba(208, 64, 64, 1)",
        },
        fill: {
          default: "rgba(0, 0, 0, 0.04)",
          hover: "rgba(0, 0, 0, 0.08)",
          active: "rgba(0, 0, 0, 0.12)",
          disabled: "rgba(0, 0, 0, 0.02)",
          focus: "rgba(0, 0, 0, 0.08)",
        },
        ghost: {
          hover: "rgba(0, 0, 0, 0.04)",
          active: "rgba(0, 0, 0, 0.08)",
        },
        mask: {
          black: "rgba(0, 0, 0, 0.8)",
          neutral: "rgba(245, 245, 245, 0.8)",
        },
        line: {
          default: "rgba(0, 0, 0, 0.06)",
        }
      },
      opacity: {
        100: '1',
        70: '0.7',
      },
      blur: {
        8: '8px',
      },
      boxShadow: {
        default: 'inset 0 0 0 1px rgba(0, 0, 0, 0.06)',
        focus: 'inset 0 0 0 1px rgba(0, 0, 0, 1)',
      },
      zIndex: {
        40: '40',
        50: '50',
      },
      spacing: {
        0: '0',
        8: '8px',
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        24: '24px',
      },
      size: {
        16: '16px',
        24: '24px',
        36: '36px',
      },
      height: {
        24: '24px',
        30: '30px',
        36: '36px',
        68: '68px',
        100: '100px',
        126: '126px',
      },
      width: {
        400: '400px',
        600: '600px',
      },
      borderRadius: {
        8: "8px",
        6: "6px",
        4: "4px",
      },
      margin: {
        3.5: '3.5px',
        4: '4px',
        8: '8px',
        16: '16px',
        24: '24px',
        106: '106px',
      },
      padding: {
        2: '2px',
        4: '4px',
        5: '5px',
        7: '7px',
        8: '8px',
        10: '10px',
        12: '12px',
        16: '16px',
        20: '20px',
        23: '23px',
        24: '24px',
        32: '32px',
      },
      gap: {
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
      },
      fontFamily: {
        'diy': ['Michroma', 'sans-serif'],
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      fontSize: {
        30: ['30px', '38px'],
        24: ['24px', '32px'],
        16: ['16px', '24px'],
        14: ['14px', '22px'],
        12: ['12px', '20px'],
      },
      letterSpacing: {
        2: '2px',
      },
      fontWeight: {
        500: '500',
        400: '400',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;