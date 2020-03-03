module.exports = {
  title: 'níama',
  description: 'Wanderings of a coder...',
  host: 'localhost',
  port: '7000',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Documentation', link: '/documentation/' },
      { text: 'Thoughts', link: '/thoughts/' },
    ],
    sidebar: {
      '/documentation/': [
        {
          title: '@niama/address',
          children: [
            ['address/boot', 'Boot Files'],
            ['address/types', 'Types'],
            ['address/i18n', 'I18n'],
          ],
        },
        {
          title: '@niama/api',
          children: [
            ['api/boot', 'Boot Files'],
            ['api/uses', 'Uses'],
            ['api/utils', 'Utilities'],
            ['api/types', 'Types'],
            ['api/i18n', 'I18n'],
          ],
        },
        {
          title: '@niama/core',

          children: [
            ['core/boot', 'Boot Files'],
          ],
        },
        {
          title: 'Universal',
          collapsable: false,
          children: [
            ['universal/auth', 'auth'],
            ['universal/orm', 'orm'],
          ],
        },
        {
          title: 'Client',
          collapsable: false,
          children: [
            ['client/auth', 'auth'],
          ],
        },
        {
          title: 'Quasar extensions',
          collapsable: false,
          children: [
            ['quasar-extensions/apollo', 'apollo'],
            ['quasar-extensions/i18n', 'i18n'],
            ['quasar-extensions/pug', 'pug'],
            ['quasar-extensions/starter', 'starter'],
            ['quasar-extensions/ts', 'ts'],
          ],
        },
      ],
      '/guide/': [
        '',
        'installation',
        'modules',
        'api',
        'orm',
        'auth',
        'static-website',
        'svelte',
        'style-guide',
        'cookbook',
        'glossary',
        'ecosystem',
      ],
    },
  },
};
