import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from '@niama/core';
import { User as UserB } from '@niama/user';

@Injectable()
export class AuthCookieS<Role extends string, User extends UserB<Role>> {
  // VARIABLES =============================================================================================================================

  protected accessCookie: string = process.env.AUTH_COOKIE_ACCESS || 'niama_access';
  protected idCookie: string = process.env.AUTH_COOKIE_ID || 'niama_id';

  // LIFECYCLE =============================================================================================================================

  constructor(protected jwtS: JwtService) {}

  // METHODS ===============================================================================================================================

  getJWT = (req: N.Request): string => {
    if (!req || (!req.signedCookies && !req.cookies)) return '';
    const idCookie: string = this.getFromRequest(req, this.idCookie); // Check null or empty
    const accessCookie: string = this.getFromRequest(req, this.accessCookie);
    return accessCookie && idCookie ? accessCookie + idCookie : '';
  };

  remove = (res: N.Response) => this.removeAuthCookies(res);
  setFromMe = (res: N.Response, { id, roles }: User) => this.setAuthCookies(res, this.jwtS.sign({ id, roles }));

  // PROTECTED =============================================================================================================================

  protected getFromRequest = (req: N.Request, id: string): string => (!isEmpty(req.signedCookies) ? req.signedCookies : req.cookies)[id];

  protected removeAuthCookies = (res: N.Response) => {
    this.setCookie(res, this.idCookie);
    this.setCookie(res, this.accessCookie);
  };

  protected setAuthCookies = (res: N.Response, token: string) => {
    this.setCookie(res, this.idCookie, token.slice(token.lastIndexOf('.') + 1), { httpOnly: true });
    this.setCookie(res, this.accessCookie, token.slice(0, token.lastIndexOf('.') + 1), { maxAge: 30 * 60 * 1000 });
  };

  protected setCookie = (res: N.Response, name: string, value?: string, options: N.CookieOptions = {}) =>
    value ? res.cookie(name, value, options) : res.clearCookie(name, options);
}
