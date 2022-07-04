module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: "#e74c3c",
        "theme-hover": "#de3523",
      },
      fontFamily: {
        varela: ["Varela Round", "sans-serif"],
      },
    },
  },
  plugins: [],
}
