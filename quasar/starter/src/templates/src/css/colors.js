const basic = {
  black: '#000000',
  current: 'currentColor',
  transparent: 'transparent',
  white: '#ffffff',
};

const palette = {
  blue: '#31ccec',
  green: '#21ba45',
  grey: '#555555',
  grey1: '#818181',
  grey2: '#cdcdcd',
  purple: '#ba93dc',
  red: '#c10015',
  yellow: '#f2c037',
};

const theme = {
  accent: palette.grey2,
  dark: palette.grey,
  info: palette.blue,
  negative: palette.red,
  positive: palette.green,
  primary: palette.purple,
  secondary: palette.grey,
  warning: palette.yellow,
};

module.exports = { ...basic, ...palette, ...theme };
