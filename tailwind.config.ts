import { colors } from './src/app/colors';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: colors.brand,
        gray: colors.gray,
        error: colors.error,
        success: colors.success,
        warning: colors.warning,
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        none: 'var(--radius-none) /* 0px */',
        xxs: 'var(--radius-xxs) /* 2px */',
        xs: 'var(--radius-xs) /* 4px */',
        sm: 'var(--radius-sm) /* 6px */',
        md: 'var(--radius-md) /* 8px */',
        lg: 'var(--radius-lg) /* 10px */',
        xl: 'var(--radius-xl) /* 12x */',
        '2xl': 'var(--radius-2xl) /* 16px */',
        '3xl': 'var(--radius-3xl) /* 20px */',
        '4xl': 'var(--radius-4xl) /* 24px */',
        full: 'var(--radius-full) /* 9999px */',
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(90deg, var(--color-brand-400) 0%, var(--color-brand-700) 100%)',
      },
      screens: {
        monitor: '1538px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
