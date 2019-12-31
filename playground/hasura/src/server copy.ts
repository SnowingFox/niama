import bodyParser from 'body-parser';
import chalk from 'chalk';
import express from 'express';

import { passport, signin, signinChecks, signup, signupChecks, webhook } from './server.passport';

export const main = async () => {
  const app = express();

  app.set('port', process.env.NIAMA_AUTH_PORT);
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/signin', signinChecks, signin);
  app.post('/signup', signupChecks, signup);
  app.get('/webhook', webhook);

  /**
   * Start Express server.
   */
  app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
};

main();
