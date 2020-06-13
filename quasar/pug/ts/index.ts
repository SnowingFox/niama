import * as T from './typings';

export = (api: T.IndexAPI) => {
  api.chainWebpack((cfg) =>
    cfg.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain')
      .loader('@niama/pug-bem-plain-loader')
  );
};
