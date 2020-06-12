import * as T from './types';

export = (api: T.IndexAPI): void => {
  api.chainWebpack((cfg) =>
    cfg.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain')
      .loader('@niama/pug-bem-plain-loader')
  );
};
