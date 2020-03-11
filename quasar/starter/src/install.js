const execa = require('execa');
const fs = require('fs');
const rimraf = require('rimraf');

const addEnvToGitignore = (api) => {
  const gitignore = api.resolve.app('.gitignore');
  const data = fs.readFileSync(gitignore, 'utf8').split('\n');
  ['.env', '.env.dev'].forEach((envName) => (!data.includes(envName) ? data.push(envName) : undefined));
  fs.writeFileSync(gitignore, Buffer.from(data.join('\n')), 'utf8');
};

const addScripts = (api) =>
  api.extendPackageJson({
    scripts: {
      'dev:client': 'quasar dev',
      'prod:client': 'quasar build',
      'prod:serve': 'quasar serve dist/spa',
    },
  });

const addPrettierConfig = (api) =>
  api.extendPackageJson({
    prettier: {
      arrowParens: 'always',
      bracketSpacing: true,
      parser: 'typescript',
      printWidth: 140,
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
    },
  });

const addNiamaExtensions = (api) =>
  ['pug', 'i18n', 'api', 'tailwindcss']
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
  const package = require(api.resolve.app('/package.json'));
  ['assets', 'boot', 'i18n', 'layouts', 'pages', 'router', 'App.vue'].forEach((name) => rimraf.sync(api.resolve.src(name)));
  rimraf.sync(api.resolve.app('quasar.conf.js'));
  api.render('./templates/main', { package });
};

module.exports = (api) => {
  addPrettierConfig(api);
  addScripts(api);
  addEnvToGitignore(api);
  addNiamaExtensions(api);
  updateContent(api);
};
