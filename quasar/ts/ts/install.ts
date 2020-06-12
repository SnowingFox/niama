import rimraf from 'rimraf';

import * as T from './typings';

export = async (api: T.InstallAPI) => await updateContent(api);

const updateContent = async (api: T.InstallAPI) => {
  const pkg = (await import(api.resolve.app('/package.json'))) as T.PackageJson;
  ['.eslintignore', '.eslintrc.js', 'jsconfig.json', 'tsconfig.json'].forEach((name) => rimraf.sync(api.resolve.app(name)));
  ['env.d.ts', 'shims-vue.d.ts'].forEach((name) => rimraf.sync(api.resolve.src(name)));
  api.render('./templates', { pkg });
};
