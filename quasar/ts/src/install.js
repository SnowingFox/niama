const rimraf = require('rimraf');

const updateContent = (api) => {
  const package = require(api.resolve.app('/package.json'));
  rimraf.sync(api.resolve.app('jsconfig.json'));
  api.render('./templates', { package });
};

module.exports = (api) => {
  updateContent(api);
};
