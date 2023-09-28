import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entity/role.entity";
import { RoleAutomapperProfile } from "./profile/role.profile";

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService, RoleAutomapperProfile],
  exports: [RoleService],
})
export class RoleModule {}
