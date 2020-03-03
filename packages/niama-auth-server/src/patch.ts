import AccountsServer, { AccountsServerOptions, ServerHooks } from '@accounts/server';
import { generateRandomToken, generateRefreshToken } from '@accounts/server/lib/utils/tokens';
import { ConnectionInformations, LoginResult, Session, Tokens, User as BaseUser } from '@accounts/types';
import jwt from 'jsonwebtoken';
import isString from 'lodash/isString';

export interface User extends BaseUser {
  roles: string[];
}

export const patch = (srv: AccountsServer) => {
  srv.loginWithUser = async function(this, user: User, infos: ConnectionInformations): Promise<LoginResult> {
    const token = await (this.options.tokenCreator ? this.options.tokenCreator.createToken(user) : generateRandomToken());
    const sessionId = await this.options.db!.createSession(user.id, token, infos);
    const { accessToken, refreshToken } = createTokens({ opts: this.getOptions(), token, user });
    return { sessionId, tokens: { refreshToken, accessToken } };
  };

  srv.refreshTokens = async function(this, accessToken: string, refreshToken: string, infos: ConnectionInformations): Promise<LoginResult> {
    try {
      if (!isString(accessToken) || !isString(refreshToken)) throw new Error('An accessToken and refreshToken are required');

      let sessionToken: string;
      try {
        jwt.verify(refreshToken, getSecretOrPublicKey(this.options));
        const decodedAccessToken = jwt.verify(accessToken, getSecretOrPublicKey(this.options), {
          ignoreExpiration: true,
        }) as { data: { token: string } };
        sessionToken = decodedAccessToken.data.token;
      } catch (err) {
        throw new Error('Tokens are not valid');
      }

      const session: Session | null = await this.options.db!.findSessionByToken(sessionToken);
      if (!session) throw new Error('Session not found');

      if (session.valid) {
        const user = await this.options.db!.findUserById(session.userId);
        if (!user) throw new Error('User not found');

        let newToken;
        if (this.options.createNewSessionTokenOnRefresh)
          newToken = await (this.options.tokenCreator ? this.options.tokenCreator.createToken(user) : generateRandomToken());

        const tokens = createTokens({ opts: this.getOptions(), token: newToken || sessionToken, user: user as User });
        await this.options.db!.updateSession(session.id, infos, newToken);

        const result = { sessionId: session.id, tokens };
        this.getHooks().emit(ServerHooks.RefreshTokensSuccess, result);
        return result;
      } else throw new Error('Session is no longer valid');
    } catch (err) {
      this.getHooks().emit(ServerHooks.RefreshTokensError, err);
      throw err;
    }
  };
};

const createTokens = ({ isImpersonated = false, opts, token, user }: CreateTokensP): Tokens => {
  const secret: jwt.Secret = getSecretOrPrivateKey(opts);
  const accessToken = generateAccessToken({ isImpersonated, secret, token, user, config: opts.tokenConfigs!.accessToken! });
  const refreshToken = generateRefreshToken({ secret, config: opts.tokenConfigs!.refreshToken! });
  return { accessToken, refreshToken };
};

const getSecretOrPublicKey = ({ tokenSecret }: AccountsServerOptions): jwt.Secret =>
  typeof tokenSecret === 'string' ? tokenSecret : tokenSecret.publicKey;

const getSecretOrPrivateKey = ({ tokenSecret }: AccountsServerOptions): jwt.Secret =>
  typeof tokenSecret === 'string' ? tokenSecret : tokenSecret.privateKey;

const generateAccessToken = ({ config, isImpersonated, secret, token, user }: GenerateAccessTokenP) =>
  jwt.sign(
    {
      data: { isImpersonated, token, userId: user.id },
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': user.roles,
        'x-hasura-default-role': user.roles[0],
        'x-hasura-user-id': user.id,
      },
    },
    secret,
    config
  );

export interface CreateTokensP {
  isImpersonated?: boolean;
  opts: AccountsServerOptions;
  token: string;
  user: User;
}

export interface GenerateAccessTokenP {
  config: any;
  isImpersonated: boolean;
  secret: jwt.Secret;
  token: string;
  user: User;
}
