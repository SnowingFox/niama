/* eslint-disable @typescript-eslint/no-var-requires */

const { configure } = require('quasar/wrappers');

module.exports = configure(() => ({
  animations: [],
  boot: ['composition', 'core', 'api'],
  build,
  css: ['app.css'],
  devServer,
  extras: ['roboto-font', 'material-icons'],
  framework,
  pwa,
  ssr,
  supportIE: false,
}));

const build = {
  env: {
    NIAMA_API_HOST: JSON.stringify(process.env.NIAMA_API_HOST),
    NIAMA_API_PATH: JSON.stringify(process.env.NIAMA_API_PATH),
    NIAMA_API_PORT: JSON.stringify(process.env.NIAMA_API_PORT),
  },
  extendWebpack: ({ module }) => {
    module.rules.push({ test: /\.mjs$/, include: /node_modules/, type: 'javascript/auto' });
  },
  preloadChunks: false,
};

const devServer = {
  open: false,
  port: process.env.QUASAR_PORT,
};

const framework = {
  all: 'auto',
  directives: ['Ripple'],
  iconSet: 'material-icons',
  lang: 'fr',
  plugins: ['Meta', 'Notify'],
};

const pwa = {
  manifest: {
    background_color: '#ffffff',
    display: 'standalone',
    icons: [
      { src: 'statics/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
      { src: 'statics/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: 'statics/icons/icon-256x256.png', sizes: '256x256', type: 'image/png' },
      { src: 'statics/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
      { src: 'statics/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    orientation: 'portrait',
    theme_color: '#027be3',
  },
};

const ssr = {
  pwa: false,
};
