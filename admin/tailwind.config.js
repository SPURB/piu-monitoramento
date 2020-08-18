/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    fontFamily: {
      body: ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        spurb: {
          default: '#008375',
          dark: '#005249',
          lighter: '#5CD6C9'
        },
        apoio: {
          primary: '#FFDAAD',
          secondary: '#A3DFF5'
        },
        erro: '#EB5757'
      }
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  }
}
