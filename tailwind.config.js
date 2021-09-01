module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
      'primary': '#107C10',
      'secondary': '#3A3A3A'
    },
    screens: {
      'tiny' : '415px',
    },
  },
  },
  variants: {
    extend: {
      scrollbar: ['rounded']
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
