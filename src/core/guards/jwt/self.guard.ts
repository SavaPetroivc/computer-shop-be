import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UserService } from "../../../models/user/services/user.service";
import { extractToken } from "./extract-token";

@Injectable()
export class SelfGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = extractToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    let payload: { username?: string };
    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException();
    }

    const targetUserId = Number(request.params.id);
    if (!Number.isInteger(targetUserId)) {
      throw new ForbiddenException();
    }

    const user = await this.userService.findUserByUsername(payload.username);
    if (!user || user.id !== targetUserId) {
      throw new ForbiddenException();
    }

    return true;
  }
}
