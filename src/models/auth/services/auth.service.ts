import { Injectable } from "@nestjs/common";
import { UserService } from "../../user/services/user.service";
import { UserNotFoundException } from "../../user/exceptions/user-not-found.exception";
import * as bcrypt from "bcrypt";
import { PasswordNotValidException } from "../../user/exceptions/password-not-valid.exception";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async auth(username: string, password: string): Promise<any> {
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

    return this.jwtService.sign({
      username: potentialUser.username,
      role: potentialUser.role.role,
      activated: potentialUser.activated,
    });
  }
}
