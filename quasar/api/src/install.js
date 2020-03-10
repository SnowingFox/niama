const execa = require('execa');

const addScripts = (api) =>
  api.extendPackageJson({
    scripts: {
      'dev:docker': 'env-cmd -f .env.dev docker-compose up -d',
      'dev:hasura': 'hasura console',
      'dev:hasura:init': 'hasura migrate apply',
    },
  });

const addNiamaExtensions = (api) =>
  ['ts']
    .map((name) => `@niama/${name}`)
    .forEach((name) => {
      if (!api.hasExtension(name))
        try {
          execa.sync('quasar', ['ext', 'add', name]);
        } catch (e) {
          console.error(` Extension ${name} failed to install:`, e);
        }
    });

const updateContent = (api) => {
  api.render('./templates');
};

module.exports = (api) => {
  addScripts(api);
  addNiamaExtensions(api);
  updateContent(api);
};
