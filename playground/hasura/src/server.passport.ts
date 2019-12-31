import { body, check, validationResult } from 'express-validator';
import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as LocalStrategy } from 'passport-local';

// CONFIG ==================================================================================================================================

passport.use(
  new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, (username, password, done) => {
    /*User.query()
      .where('username', username)
      .first()
      .then((user) => {
        if (!user) return done('Unknown user');
        user.verifyPassword(password, (err, passwordCorrect) => {
          if (err) return done(err);
          if (!passwordCorrect) return done('Invalid password');
          return done(null, user);
        });
      })
      .catch((err) => done(err));*/
  })
);

passport.use(
  new BearerStrategy((token, done) => {
    /*User.query()
      .where('token', token)
      .first()
      .then((user) => {
        if (!user) return done('Invalid Token');
        return done(null, user);
      })
      .catch((err) => done(err));*/
  })
);

export { passport };

// UTILS ==================================================================================================================================

const handleResponse = (res, code, statusMsg) => res.status(code).json(statusMsg);

// SIGNIN ==================================================================================================================================

export const signinChecks = [
  check(['username', 'Username is not valid']).notEmpty(),
  check(['password', 'Password cannot be blank']).notEmpty(),
];

export const signin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  passport.authenticate('local', (err, user) => {
    if (err) return handleResponse(res, 400, { error: err });
    if (user) handleResponse(res, 200, user.getUser());
  })(req, res, next);
};

// SIGNUP ==================================================================================================================================

export const signupChecks = [
  check(['username', 'Username is not valid']).notEmpty(),
  check(['password', 'Password Password must be at least 4 characters long be blank']).isLength({ min: 4 }),
];

export const signup = async (req, res, next) => {
  if (req.body.password)
    await body(['confirmPassword', 'Passwords do not match'])
      .equals(req.body.password)
      .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  /*try {
    const user = await User.query()
      .allowInsert('[username, password]')
      .insert({
        username: req.body.username,
        password: req.body.password,
      });
  } catch (err) {
    errorHandler(err, res);
    return;
  }*/
  passport.authenticate('local', (err, user) => {
    if (err) return handleResponse(res, 400, { error: err });
    if (user) handleResponse(res, 200, user.getUser());
  })(req, res, next);
};

// WEBHOOK =================================================================================================================================

export const webhook = (req, res, next) =>
  passport.authenticate('bearer', (err, user) => {
    if (err) return handleResponse(res, 401, { error: err });
    if (user)
      handleResponse(res, 200, {
        'X-Hasura-Role': 'admin',
        'X-Hasura-User-Id': `${user.id}`,
      });
    else handleResponse(res, 200, { 'X-Hasura-Role': 'anonymous' });
  })(req, res, next);
