import rimraf from 'rimraf';

export = (api) => {
  rimraf.sync(api.resolve.src('css'));
  rimraf.sync(api.resolve.app('.postcssrc.js'));
  api.render('../templates');
};
