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
          title: 'Universal',
          collapsable: false,
          children: [
            ['universal/api', 'api'],
            ['universal/auth', 'auth'],
            ['universal/core', 'core'],
            ['universal/nav', 'nav'],
            ['universal/orm', 'orm'],
          ],
        },
        {
          title: 'Client',
          collapsable: false,
          children: [
            ['client/api', 'api'],
            ['client/auth', 'auth'],
            ['client/nav', 'nav'],
            ['client/orm', 'orm'],
          ],
        },
        {
          title: 'Server',
          collapsable: false,
          children: [

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
      '/guide/': ['', 'installation', 'modules', 'style-guide', 'cookbook', 'glossary', 'ecosystem'],
    },
  },
};
