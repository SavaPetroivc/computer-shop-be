import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./services/user.service";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { UserCreateDto } from "./dto/user-create.dto";
import { Response, Request } from "express";
import { User } from "./entities/user.entity";
import { UserAlreadyExistsExceptionFilter } from "../../core/filters/exceptions/user-already-exists-exception.filter";
import { AuthDto } from "./dto/auth.dto";
import { JwtGuard } from "../../core/guards/jwt/jwt.guard";
import { AuthService } from "../auth/services/auth.service";
import { AUTHORIZATION_HEADER } from "../../core/headers/headers";
import { UserNotFoundExceptionFilter } from "../../core/filters/exceptions/user-not-found-exception.filter";
import { PasswordNotValidExceptionFilter } from "../../core/filters/exceptions/password-not-valid-exception.filter";
import { UserAsEmployeeCreateDto } from "./dto/user-as-employee-create.dto";
import { RoleName } from "../role/enums/role-name.enum";
import { RoleGuard } from "../../core/guards/jwt/role.guard";
import { Roles } from "../../core/decorators/roles.decorator";
import { RoleService } from "../role/role.service";
import { SelfGuard } from "../../core/guards/jwt/self.guard";
import { JwtService } from "@nestjs/jwt";
import { UserUpdateDto } from "./dto/user-update.dto";
import { ApiTags } from "@nestjs/swagger";
import { MeUserInfoDto } from "./dto/me-user-info.dto";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(
    @InjectMapper() private readonly classMapper: Mapper,
    private readonly userService: UserService,
    private authService: AuthService,
    private jwtService: JwtService,
    private roleService: RoleService,
  ) {}

  @Post("")
  @UseFilters(new UserAlreadyExistsExceptionFilter())
  async registerUser(
    @Body() userCreateDto: UserCreateDto,
    @Res() res: Response,
  ) {
    const user = this.classMapper.map(userCreateDto, UserCreateDto, User);
    user.role = await this.roleService.getRoleByName(RoleName.USER);
    user.activated = true;

    await this.userService.save(user);
    res.sendStatus(HttpStatus.OK);
  }

  @Post("auth")
  @UseFilters(UserNotFoundExceptionFilter)
  @UseFilters(PasswordNotValidExceptionFilter)
  async auth(@Body() authDto: AuthDto, @Res() res: Response) {
    const token = await this.authService.auth(
      authDto.username,
      authDto.password,
    );
    res.cookie(AUTHORIZATION_HEADER, token, { httpOnly: true });
    res.sendStatus(HttpStatus.OK);
  }

  @Post("with-role")
  @Roles([RoleName.ADMINISTRATOR])
  @UseGuards(JwtGuard, RoleGuard)
  async createUserWithSpecificRole(
    @Body() userAsEmployeeCreateDto: UserAsEmployeeCreateDto,
  ) {
    const user = this.classMapper.map(
      userAsEmployeeCreateDto,
      UserAsEmployeeCreateDto,
      User,
    );
    user.password = "Test123";
    return await this.userService.save(user);
  }

  @Get("me")
  @UseGuards(JwtGuard)
  async getUserInfo(@Res() res: Response, @Req() req: Request) {
    const user = await this.userService.findUserByUsername(
      this.jwtService.decode(req.cookies[AUTHORIZATION_HEADER])["username"],
      { role: true },
    );
    res.send(this.classMapper.map(user, User, MeUserInfoDto));
  }

  @Put(":id")
  @UseGuards(JwtGuard, SelfGuard)
  async updateUser(@Req() req: Request, @Res() res: Response) {
    try {
      const jwt = req.header("authorization");
      const decodedJwt: any = this.jwtService.decode(jwt);
      const currentUser = await this.userService.findUserByUsername(
        decodedJwt.username,
      );

      const userForUpdate = this.classMapper.map(req.body, UserUpdateDto, User);

      await this.userService.updateUser(userForUpdate, currentUser);
      res.sendStatus(HttpStatus.OK);
    } catch ({ message }) {
      res.status(HttpStatus.BAD_REQUEST).send({ message });
    }
  }
}
