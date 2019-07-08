import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthJwtG extends AuthGuard('jwt') {
  // OVERRIDE ==============================================================================================================================

  canActivate(context: ExecutionContext): N.Future<boolean> {
    if (context.getClass().name === 'AuthCT') return true;
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext() ? ctx.getContext().req : context.switchToHttp().getRequest();
  }
}
