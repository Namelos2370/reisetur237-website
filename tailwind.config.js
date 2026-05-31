/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy:  { DEFAULT: '#1A1A1A', light: '#2D2D2D', dark: '#0F0F0F' },
        gold:  { DEFAULT: '#C8A84B', light: '#E2C97E', dark: '#A07C20' },
        red:   { DEFAULT: '#C0392B', light: '#E74C3C', dark: '#922B21' },
        slate: { DEFAULT: '#64748B', light: '#F1F5FB', dark: '#334155' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      animation: {
        'fade-up':   'fadeUp 0.7s ease forwards',
        'fade-in':   'fadeIn 0.5s ease forwards',
        'slide-in':  'slideIn 0.6s ease forwards',
      },
      keyframes: {
        fadeUp:  { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:  { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideIn: { '0%': { opacity: 0, transform: 'translateX(-20px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
      }
    }
  },
  plugins: []
}
