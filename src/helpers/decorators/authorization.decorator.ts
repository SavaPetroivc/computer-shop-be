import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AUTHORIZATION_HEADER } from "../../core/headers/headers";

export const Authorization = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().cookies[AUTHORIZATION_HEADER];
  },
);
