import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../../models/user/services/user.service";
import { AUTHORIZATION_HEADER } from "../../headers/headers";

@Injectable()
export class SelfGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies[AUTHORIZATION_HEADER];
    const jwtBody: any = this.jwtService.decode(jwt);

    const url: string = context.switchToHttp().getRequest().url;
    const userForUpdateId = Number.parseInt(
      url.substring(url.lastIndexOf("/") + 1, url.length),
    );
    const user = await this.userService.findUserByUsername(jwtBody.username);

    return user.id === userForUpdateId;
  }
}
