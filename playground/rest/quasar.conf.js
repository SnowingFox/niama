require('dotenv').config({ path: '.env.dev' });
const path = require('path');

const alias = (cfg) => {
  cfg.resolve.alias = {
    ...cfg.resolve.alias,
    '~': __dirname,
    '@': path.resolve(__dirname, 'src'),
  };
};

const gql = (cfg) => {
  rule = cfg.module.rules.find(({ test }) => `${test}` === `${/\.vue$/}`);
  rule.use[0].options = { ...rule.use[0].options, transpileOptions: { transforms: { dangerousTaggedTemplateString: true } } };
};

const i18n = ({ module: { rules } }) =>
  rules.push({ resourceQuery: /blockType=i18n/, use: [{ loader: '@kazupon/vue-i18n-loader' }, { loader: 'yaml-loader' }] });

const pug = (cfg) => {
  cfg.module.rules.push({
    test: /\.pug$/,
    loader: 'pug-plain-loader',
  });
};

module.exports = function(ctx) {
  return {
    animations: [],
    boot: ['i18n', 'apollo', 'router'],
    build: {
      analyze: true,
      env: {
        NIAMA_API_HOST: JSON.stringify(process.env.NIAMA_API_HOST),
        NIAMA_API_PATH: JSON.stringify(process.env.NIAMA_API_PATH),
        NIAMA_API_PORT: JSON.stringify(process.env.NIAMA_API_PORT),
      },
      extendWebpack(cfg) {
        alias(cfg);
        pug(cfg);
        i18n(cfg);
        gql(cfg);
      },
      scopeHoisting: true,
    },
    cordova: {},
    css: ['app.styl'],
    devServer: {
      open: false,
      port: process.env.QUASAR_PORT,
    },
    electron: {
      builder: {},
      extendWebpack(cfg) {},
      packager: {},
    },
    extras: ['roboto-font', 'material-icons'],
    framework: {
      components: [
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QBtn',
        'QBtnGroup',
        'QCard',
        'QCardActions',
        'QCardSection',
        'QChip',
        'QDialog',
        'QDrawer',
        'QForm',
        'QHeader',
        'QIcon',
        'QImg',
        'QInfiniteScroll',
        'QInnerLoading',
        'QInput',
        'QItem',
        'QItemLabel',
        'QItemSection',
        'QLayout',
        'QList',
        'QPage',
        'QPageContainer',
        'QRouteTab',
        'QSelect',
        'QSeparator',
        'QSpace',
        'QSpinner',
        'QSpinnerDots',
        'QTab',
        'QTabPanel',
        'QTabPanels',
        'QTable',
        'QTabs',
        'QToolbar',
        'QToolbarTitle',
        'QTooltip',
      ],
      directives: ['Ripple'],
      lang: 'fr',
      plugins: ['Notify'],
    },
    pwa: {
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
    },
    sourceFiles: { router: 'src/router/index.ts' },
    ssr: { pwa: false },
    supportIE: false,
  };
};
