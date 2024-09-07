/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

    purge: [
      "*.html",
      "./*.html",
      "../*.html",
      "../includes/*.html",
    ],
    future: {},
    theme: {
    extend: {},
    },
    variants: {},
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
    ]
}
