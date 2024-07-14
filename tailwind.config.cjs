// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gold: '#ffd700',
        'gold-dark': '#e6ac00',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
