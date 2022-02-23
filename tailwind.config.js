module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        primary: {
          100 : '#D4ECDD',
          200 : '#252323',
          300 : '#4CA1A3'
        },
        secondary: {
          100: '#152D35',
          200: '#112031', 
        } 
      },
      fontFamily: {
        body: ['Nunito'],
        head: ['Montserrat'],
        special: ['Sacramento']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
