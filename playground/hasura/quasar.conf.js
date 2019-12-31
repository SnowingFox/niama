module.exports = () => ({
  animations: [],
  boot: ['composition', 'i18n', 'api', 'auth'],
  build: {
    env: {
      NIAMA_API_HOST: JSON.stringify(process.env.NIAMA_API_HOST),
      NIAMA_API_PATH: JSON.stringify(process.env.NIAMA_API_PATH),
      NIAMA_API_PORT: JSON.stringify(process.env.NIAMA_API_PORT),
    },
    extendWebpack: ({ module }) => {
      module.rules.push({ test: /\.mjs$/, include: /node_modules/, type: 'javascript/auto' });
    },
    preloadChunks: false,
  },
  css: ['app.css'],
  devServer: { open: false, port: process.env.QUASAR_PORT },
  extras: ['roboto-font', 'material-icons'],
  framework: {
    all: 'auto',
    lang: 'fr',
    plugins: ['Cookies', 'Dialog', 'Meta', 'Notify'],
  },
  pwa: {
    manifest: {
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#ffffff',
      theme_color: '#027be3',
      icons: [
        { src: 'statics/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
        { src: 'statics/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'statics/icons/icon-256x256.png', sizes: '256x256', type: 'image/png' },
        { src: 'statics/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
        { src: 'statics/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
  },
  ssr: { pwa: false },
  supportIE: false,
});
