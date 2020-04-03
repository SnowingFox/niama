const basic = {
  black: '#000000',
  current: 'currentColor',
  transparent: 'transparent',
  white: '#ffffff',
};

const palette = {
  blue: '#29c8e5',
  blue1: '#009bb7',
  blue2: '#31ccec',
  green: '#21ba45',
  grey: '#555555',
  grey1: '#818181',
  grey2: '#cdcdcd',
  purple: '#9c27b0',
  red: '#c10015',
  teal: '#26a69a',
  yellow: '#f2c037',
};

const theme = {
  accent: palette.grey2,
  dark: palette.grey,
  info: palette.blue2,
  negative: palette.red,
  positive: palette.green,
  primary: palette.blue,
  secondary: palette.grey,
  warning: palette.yellow,
};

module.exports = { ...basic, ...palette, ...theme };
