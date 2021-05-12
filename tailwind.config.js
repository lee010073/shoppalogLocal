module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    },
    screens: {
      phone: "320px",
      // => @media (min-width: 320px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      xxl:"1536px",
        // => @media (min-width: 1536px) { ... }
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
      gridColumn: ['responsive', 'hover'],
      gridColumnStart: ['responsive', 'hover'],
      gridColumnEnd: ['responsive', 'hover'],
      stroke: ['hover', 'focus'],
      backgroundImage: ['hover', 'focus'],
      backgroundColor: ['group-focus','active'],
      textColor: ['group-focus','active'],
      margin: ['hover', 'focus'],
    },
  },
  plugins: [],
};
