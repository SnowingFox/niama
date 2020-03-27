import rimraf from 'rimraf';

export default (api) => {
  rimraf.sync(api.resolve.app('.postcssrc.js'));
  rimraf.sync(api.resolve.src('css'));
  api.render('../templates');
};
