import { Injectable } from "@nestjs/common";
import { UserService } from "../../user/services/user.service";
import { UserNotFoundException } from "../../user/exceptions/user-not-found.exception";
import * as bcrypt from "bcrypt";
import { PasswordNotValidException } from "../../user/exceptions/password-not-valid.exception";
import { JwtService } from "@nestjs/jwt";
import { MeUserInfoDto } from "../../user/dto/me-user-info.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { User } from "../../user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,

    @InjectMapper() private readonly classMapper: Mapper,
    private jwtService: JwtService,
  ) {}

  async auth(
    username: string,
    password: string,
  ): Promise<[MeUserInfoDto, string]> {
    const potentialUser = await this.userService.findUserByUsername(username, {
      role: true,
    });
    if (!potentialUser) {
      throw new UserNotFoundException();
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      potentialUser.password,
    );

    if (!isPasswordMatch) {
      throw new PasswordNotValidException();
    }

    return [
      this.classMapper.map(potentialUser, User, MeUserInfoDto),
      this.jwtService.sign({
        username: potentialUser.username,
        role: potentialUser.role.role,
        activated: potentialUser.activated,
      }),
    ];
  }
}
