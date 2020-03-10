const updateContent = (api) => {
  const package = require(api.resolve.app('/package.json'));
  api.render('./templates', { package });
};

module.exports = (api) => {
  updateContent(api);
};
