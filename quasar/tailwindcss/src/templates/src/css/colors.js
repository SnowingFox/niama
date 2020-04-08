const basic = {
  black: '#000000',
  current: 'currentColor',
  transparent: 'transparent',
  white: '#ffffff',
};

const palette = {
  blue: '#1976d2',
  blue1: '#31ccec',
  green: '#21ba45',
  grey: '#1d1d1d',
  purple: '#9c27b0',
  red: '#c10015',
  teal: '#26a69a',
  yellow: '#f2c037',
};

const theme = {
  accent: palette.purple,
  dark: palette.grey,
  info: palette.blue1,
  negative: palette.red,
  positive: palette.green,
  primary: palette.blue,
  secondary: palette.teal,
  warning: palette.yellow,
};

module.exports = { ...basic, ...palette, ...theme };
