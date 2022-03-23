const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/*.{html,ts}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0D153F',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
