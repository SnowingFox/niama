const rimraf = require('rimraf');

module.exports = (api) => {
  rimraf.sync(api.resolve.app('.postcssrc.js'));
  rimraf.sync(api.resolve.src('css'));
  api.render('./templates');
}
