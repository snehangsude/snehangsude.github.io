/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-text': '#292524',
        'secondary-text': '#44403c',
        'background-light': '#D8C6B1', // Warm Tan
        'card-bg': 'rgba(245, 236, 220, 0.6)', // Light Cream
        'accent-rust': '#557DAA', // Paradoxically Blue
        'accent-dark': '#365675', // Deeper slate blue
        'subtle-border': 'rgba(214, 211, 205, 0.5)',
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        sofia: ['Sofia', 'cursive'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
