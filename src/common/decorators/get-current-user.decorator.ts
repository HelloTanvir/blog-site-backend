import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetCurrentUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const context = GqlExecutionContext.create(ctx);
        const request = context.getContext();

        if (!data) return request.user;

        return request.user[data];
    }
);
