import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { UserService } from "../user/services/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Role } from "../role/entity/role.entity";
import { RoleService } from "../role/role.service";
import { JwtStrategy } from "../../core/strategy/jwt.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [JwtStrategy, AuthService, UserService, RoleService],
  exports: [AuthService],
})
export class AuthModule {}
