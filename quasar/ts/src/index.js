const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (api) =>
  api.chainWebpack((cfg) => {
    const package = require(api.resolve.app('/package.json'));
    cfg.resolve.extensions.add('.ts').add('.tsx');
    cfg.resolve.alias.set(`@/${package.name}`, api.resolve.app('/src'));
    cfg.module
      .rule('typescript')
      .test(/\.tsx?$/)
      .use('ts-loader')
      .loader('ts-loader')
      .options({ appendTsSuffixTo: [/\.vue$/], onlyCompileBundledFiles: false, transpileOnly: true });
    cfg.plugin('ts-checker').use(ForkTsCheckerWebpackPlugin, [{ vue: true }]);
  });
