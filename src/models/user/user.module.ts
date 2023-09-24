import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { UserController } from "./user.controller";
import { UserAutomapperProfile } from "./profiles/user.profile";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { RoleModule } from "../role/role.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, UserAutomapperProfile],
  exports: [UserService],
})
export class UserModule {}
