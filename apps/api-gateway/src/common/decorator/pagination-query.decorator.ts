import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PaginationQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      page: request.query.page,
      limit: request.query.limit,
    };
  },
);
