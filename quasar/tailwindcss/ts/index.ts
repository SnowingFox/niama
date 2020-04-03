import PurgecssPlugin from '@niama/purgecss-webpack-plugin';
import glob from 'glob-all';
import path from 'path';

import wl from './whitelister';

export = async (api) => {
  enforceCompatibility(api);

  api.chainWebpack((cfg) => {
    processPostCss(cfg);
    if (api.ctx.prod) purgeCss(api, cfg);
  });

  await addBrandColors(api);
};

const addBrandColors = async (api) => {
  const colors = await import(api.resolve.src('css/colors'));
  api.extendQuasarConf((conf) => (conf.framework.config.brand = colors.default));
};

const enforceCompatibility = (api) => {
  api.compatibleWith('quasar', '^1.0.0');
  api.compatibleWith('@quasar/app', '^1.0.0');
};

const processPostCss = (cfg) => {
  const rule = cfg.module.rule('postcss').test(/\.(postcss)$/);
  rule.use('vue-style').loader('vue-style-loader');
  rule.use('css').loader('css-loader');
  rule.use('postcss').loader('postcss-loader');
};

const purgeCss = (api, cfg) => {
  const vueRule = cfg.module.rule('vue').test(/\.vue$/);
  vueRule.use('whitelister').loader(path.join(__dirname, 'loader'));

  const purgecssOpts = {
    paths: () => [...glob.sync([api.resolve.src('**/*.html'), api.resolve.src('**/*.vue')]), ...wl.paths],
    whitelistPatterns: () => wl.patterns,
  };
  cfg.plugin('purgecss').use(PurgecssPlugin, [purgecssOpts]);
};
