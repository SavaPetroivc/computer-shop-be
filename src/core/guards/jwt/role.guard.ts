import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { extractToken } from "./extract-token";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: string[] = this.reflector.getAllAndOverride("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = extractToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    let payload: { role?: string; activated?: boolean };
    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException();
    }

    if (!payload.activated || !requiredRoles.includes(payload.role)) {
      throw new ForbiddenException();
    }

    return true;
  }
}
