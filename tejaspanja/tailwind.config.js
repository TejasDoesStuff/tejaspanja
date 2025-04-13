// tailwind.config.js
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          cream: '#fdf8f1',
          starchBlue: '#4a8fe7',
          starchPink: '#f082ac',
        },
        fontFamily: {
          brutal: ['"Helvetica Neue"', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  