module.exports = (api) =>
  api.chainWebpack((cfg) =>
    cfg.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain')
      .loader('pug-plain-loader')
  );
