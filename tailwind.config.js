/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 背景顏色
        'bg-primary': '#131B29',
        'row-hover': '#1E3059',
        
        // 文字顏色
        'text-default': '#F0F4F8',
        'text-secondary': '#8698aa',
        'text-buy': '#00b15d',
        'text-sell': '#FF5B5A',
        
        // 上漲/下跌背景色
        'bg-price-up': 'rgba(16, 186, 104, 0.12)',
        'bg-price-down': 'rgba(255, 90, 90, 0.12)',
        'bg-price-same': 'rgba(134, 152, 170, 0.12)',
        
        // 累計總量條顏色
        'bar-buy': 'rgba(16, 186, 104, 0.12)',
        'bar-sell': 'rgba(255, 90, 90, 0.12)',
        
        // 動畫閃爍顏色
        'flash-green': 'rgba(0, 177, 93, 0.5)',
        'flash-red': 'rgba(255, 91, 90, 0.5)',
      },
      backgroundColor: {
        'flash-green': 'rgba(0, 177, 93, 0.5)',
        'flash-red': 'rgba(255, 91, 90, 0.5)',
      },
      animation: {
        'flash-green': 'flash-green 1s ease-out',
        'flash-red': 'flash-red 1s ease-out',
      },
      keyframes: {
        'flash-green': {
          '0%': { backgroundColor: 'rgba(0, 177, 93, 0.5)' },
          '100%': { backgroundColor: 'transparent' },
        },
        'flash-red': {
          '0%': { backgroundColor: 'rgba(255, 91, 90, 0.5)' },
          '100%': { backgroundColor: 'transparent' },
        },
      },
    },
  },
  plugins: [],
} 