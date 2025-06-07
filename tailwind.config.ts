import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
