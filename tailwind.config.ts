import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: '#7C9A8E',
        blue: '#6B8DAE',
        terracotta: '#C4836A',
        background: {
          DEFAULT: '#0B1014',
          soft: '#111820',
        },
        text: {
          DEFAULT: '#E5E7EB',
          muted: '#9CA3AF',
        },
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

export default config;

