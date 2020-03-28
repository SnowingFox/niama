import rimraf from 'rimraf';

export = (api) => {
  rimraf.sync(api.resolve.src('css'));
  api.render('../templates');
};
