import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AUTHORIZATION_HEADER } from "../../headers/headers";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies[
      AUTHORIZATION_HEADER
    ];
    const requiredRoles: string[] = this.reflector.getAllAndOverride("roles", [
      context.getHandler(),
    ]);

    const jwtBody: any = this.jwtService.decode(jwt);
    return (
      requiredRoles.some((requiredRole) => requiredRole === jwtBody.role) &&
      jwtBody.activated
    );
  }
}
