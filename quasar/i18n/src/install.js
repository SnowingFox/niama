const execa = require('execa');

module.exports = (api) => {
  const package = require(api.resolve.app('/package.json'));
  if (!api.hasExtension('@niama/ts'))
    try {
      execa.sync('quasar', ['ext', 'add', '@niama/ts']);
    } catch (e) {
      console.error(` Extension @niama/ts failed to install:`, e);
    }
  api.render('./templates', { package });
};
