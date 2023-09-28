import { AutoMap } from "@automapper/classes";
import { RoleName } from "../enums/role-name.enum";
import { ApiProperty } from "@nestjs/swagger";

export class RoleInUserOverviewDto {
  @AutoMap()
  @ApiProperty()
  id: number;
  @ApiProperty()
  @AutoMap()
  role: RoleName;
}
