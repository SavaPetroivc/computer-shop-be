import { Controller, Get, UseGuards } from "@nestjs/common";
import { RoleService } from "./role.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "./entity/role.entity";
import { RoleGuard } from "../../core/guards/jwt/role.guard";
import { JwtGuard } from "../../core/guards/jwt/jwt.guard";
import { RoleName } from "./enums/role-name.enum";
import { Roles } from "../../core/decorators/roles.decorator";

@ApiTags("roles")
@Controller("roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseGuards(JwtGuard, RoleGuard)
  @Roles([RoleName.ADMINISTRATOR])
  @ApiOkResponse({ type: [Role] })
  async getRoles() {
    return await this.roleService.getRoles();
  }
}
