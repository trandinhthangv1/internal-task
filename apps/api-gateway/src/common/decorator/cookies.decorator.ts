import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Cookies = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.cookies;
});
