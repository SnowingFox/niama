module.exports = (api) =>
  api.chainWebpack((cfg) =>
    cfg.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .use('vue-i18n-loader')
      .loader('@kazupon/vue-i18n-loader')
      .end()
      .use('yaml-loader')
      .loader('yaml-loader')
  );
