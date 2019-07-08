import { createParamDecorator } from '@nestjs/common';
import { User as UserB } from '@niama/user';
import { Request } from 'express';

export const Me = createParamDecorator(function<Role extends string, User extends UserB<Role>>(data: string, req: Request): User {
  if (Array.isArray(req)) req = req[2].req;
  return data ? req.user && req.user[data] : req.user;
});
