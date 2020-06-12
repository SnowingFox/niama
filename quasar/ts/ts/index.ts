import { CLIEngine } from 'eslint';
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';

import * as T from './typings';

export = async (api: T.IndexAPI) => {
  enforceConf(api);
  await chainWebpack(api);
};

const enforceConf = (api: T.IndexAPI) =>
  api.extendQuasarConf((conf) => (conf.supportTS = conf.supportTS || { tsCheckerConfig: { eslint: true } }));

const chainWebpack = async (api: T.IndexAPI) => {
  const pkg = (await import(api.resolve.app('/package.json'))) as T.PackageJson;
  api.chainWebpack((cfg) => {
    cfg.resolve.alias.set(`@/${pkg.name}`, api.resolve.app('/src'));
    cfg.resolve.plugin('tsconfigpaths').use(TsconfigPathsWebpackPlugin);
    if (process.env.NODE_ENV !== 'production') return;
    cfg.module
      .rule('lint')
      .test(/\.(js|vue)$/)
      .pre()
      .use('eslint')
      .loader('eslint-loader')
      .options({ formatter: CLIEngine.getFormatter('stylish') });
  });
};
