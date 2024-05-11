import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffff',
        primary: '#091b50',
        secondary: '#fbbf24',
        tertiary: '#3c4d82',
        grayText: '#e0e4ef',
        grayTextAlt: '#4b5563',
        grayBackground: 'rgba(224, 228, 239, 0.3)',
        error: '#B91C1C',
      },
    },
  },
  plugins: [],
};
export default config;
