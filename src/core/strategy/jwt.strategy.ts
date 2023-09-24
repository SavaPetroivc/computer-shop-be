import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AUTHORIZATION_HEADER } from "../headers/headers";
import { ConfigService } from "@nestjs/config";
import { Configuration } from "../configuration/model/configuration.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<Configuration>) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(AUTHORIZATION_HEADER.toLowerCase()),
      ignoreExpiration: false,
      secretOrKey: configService.get("jwtSecret"),
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
