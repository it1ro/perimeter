import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

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
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'var(--font-inter)', 'ui-sans-serif', 'sans-serif'],
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      typography: {
        sage: {
          css: {
            '--tw-prose-body': '#E5E7EB',
            '--tw-prose-headings': '#E5E7EB',
            '--tw-prose-lead': '#9CA3AF',
            '--tw-prose-links': '#7C9A8E',
            '--tw-prose-bold': '#E5E7EB',
            '--tw-prose-counters': '#9CA3AF',
            '--tw-prose-bullets': '#7C9A8E',
            '--tw-prose-hr': 'rgba(255,255,255,0.1)',
            '--tw-prose-quotes': '#E5E7EB',
            '--tw-prose-quote-borders': '#7C9A8E',
            '--tw-prose-captions': '#9CA3AF',
            '--tw-prose-code': '#E5E7EB',
            '--tw-prose-pre-code': '#E5E7EB',
            '--tw-prose-pre-bg': '#111820',
            '--tw-prose-th-borders': 'rgba(255,255,255,0.15)',
            '--tw-prose-td-borders': 'rgba(255,255,255,0.08)',
            'h2': {
              fontFamily: 'var(--font-manrope), ui-sans-serif, sans-serif',
            },
            'h3': {
              fontFamily: 'var(--font-manrope), ui-sans-serif, sans-serif',
            },
            'a': {
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              '&:hover': {
                color: '#7C9A8E',
                opacity: '0.8',
              },
            },
            'blockquote': {
              borderLeftColor: '#7C9A8E',
              backgroundColor: 'rgba(124,154,142,0.05)',
              borderRadius: '0 0.75rem 0.75rem 0',
              padding: '1rem 1.25rem',
              fontStyle: 'normal',
            },
            'code': {
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: '0.25rem',
              padding: '0.15em 0.35em',
              fontWeight: '400',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            'table': {
              fontSize: '0.875rem',
            },
            'thead th': {
              backgroundColor: 'rgba(255,255,255,0.05)',
              padding: '0.75rem 1rem',
            },
            'tbody td': {
              padding: '0.75rem 1rem',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;

