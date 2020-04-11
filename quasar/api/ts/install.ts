import execa from 'execa';

import * as T from './types';

const addScripts = (api: T.InstallAPI) =>
  api.extendPackageJson({
    scripts: {
      'dev:docker': 'env-cmd -f .env.dev docker-compose up -d',
      'dev:hasura': 'hasura console',
      'dev:hasura:init': 'hasura migrate apply',
    },
  });

const addNiamaExtensions = (api: T.InstallAPI) =>
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

const updateContent = async (api: T.InstallAPI) => {
  const pkg = await import(api.resolve.app('/package.json'));
  api.render('./templates', { pkg });
};

export = async (api: T.InstallAPI) => {
  addScripts(api);
  addNiamaExtensions(api);
  await updateContent(api);
};
