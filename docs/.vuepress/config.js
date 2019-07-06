module.exports = {
  title: 'níama',
  description: 'Wanderings of a coder...',
  host: 'localhost',
  port: '7000',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Environments', link: '/environments/' },
      { text: 'Documentation', link: '/documentation/' },
      { text: 'Thoughts', link: '/thoughts/' },
    ],
    sidebar: { '/documentation/': ['', 'api', 'crud'], '/environments/': ['', 'quasar', 'conventions'] },
  },
};
