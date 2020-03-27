import autoprefixer from 'autoprefixer';
import glob from 'glob-all';
import path from 'path';
import nested from 'postcss-nested';
import PurgecssPlugin from 'purgecss-webpack-plugin';
import tailwindcss from 'tailwindcss';

import wl from './whitelister';

export = async (api) => {
  enforceCompatibility(api);

  api.chainWebpack(({ module: mod, plugin }) => {
    const vueRule = mod.rule('vue').test(/\.vue$/);
    vueRule.use('whitelister').loader(path.join(__dirname, 'loader'));

    const postCssRule = mod.rule('postcss').test(/\.(postcss)$/);
    postCssRule.use('vue-style').loader('vue-style-loader');
    postCssRule.use('css').loader('css-loader');
    postCssRule
      .use('postcss')
      .loader('postcss-loader')
      .options({ plugins: [nested, tailwindcss(), autoprefixer], ident: 'postcss' });

    if (api.ctx.prod)
      plugin('purgecss').use(
        new PurgecssPlugin({ paths: glob.sync([api.resolve.src('**/*.html'), api.resolve.src('**/*.vue')]), whitelist: wl.elements })
      );
    // defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    // whitelistPatterns: [/^((?!_).)((?!:_).)*$/],
  });

  await extendConf(api);
};

const enforceCompatibility = (api) => {
  api.compatibleWith('quasar', '^1.0.0');
  api.compatibleWith('@quasar/app', '^1.0.0');
};

const extendConf = async (api) => {
  const colors = await import(api.resolve.src('css/colors'));
  api.extendQuasarConf((conf) => (conf.framework.config.brand = colors));
};
