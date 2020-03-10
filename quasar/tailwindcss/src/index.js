module.exports = (api) => {
  api.chainWebpack((cfg) =>
    cfg.module
      .rule('postcss')
      .test(/\.(postcss)$/)
      .use('vue-style')
      .loader('vue-style-loader')
      .end()
      .use('css')
      .loader('css-loader')
      .end()
      .use('postcss')
      .loader('postcss-loader')
  );
  
  api.extendQuasarConf((conf) => {
    const colors = require(api.resolve.app('/src/css/colors'));
    conf.framework.config.brand = colors;
  });
};
