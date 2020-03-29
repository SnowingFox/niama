import autoprefixer from 'autoprefixer';
import glob from 'glob-all';
import path from 'path';
import nested from 'postcss-nested';
import PurgecssPlugin from 'purgecss-webpack-plugin';
import tailwindcss from 'tailwindcss';

import wl from './whitelister';

export = async (api) => {
  enforceCompatibility(api);

  api.chainWebpack((cfg) => {
    const vueRule = cfg.module.rule('vue').test(/\.vue$/);
    vueRule.use('whitelister').loader(path.join(__dirname, 'loader'));

    const postCssRule = cfg.module.rule('postcss').test(/\.(postcss)$/);
    postCssRule.use('vue-style').loader('vue-style-loader');
    postCssRule.use('css').loader('css-loader');
    postCssRule
      .use('postcss')
      .loader('postcss-loader')
      .options({ plugins: [nested, tailwindcss(), autoprefixer], ident: 'postcss' });

    if (api.ctx.prod)
      cfg
        .plugin('purgecss')
        .use(PurgecssPlugin, [
          {
            paths: () => [...glob.sync([api.resolve.src('**/*.html'), api.resolve.src('**/*.vue')]), ...wl.paths],
            whitelistPatterns: () => wl.patterns,
          },
        ]);
    // defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  });

  await extendConf(api);
};

const enforceCompatibility = (api) => {
  api.compatibleWith('quasar', '^1.0.0');
  api.compatibleWith('@quasar/app', '^1.0.0');
};

const extendConf = async (api) => {
  const colors = await import(api.resolve.src('css/colors'));
  api.extendQuasarConf((conf) => (conf.framework.config.brand = colors.default));
};
