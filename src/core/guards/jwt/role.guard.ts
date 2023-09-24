import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().headers.authorization;
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
