module.exports = {
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-storysource',
    '@storybook/addon-actions',
    '@storybook/addon-knobs/register',
    '@storybook/addon-docs',
  ],
  stories: ['../src/**/*.stories.[tj]s'],
};
