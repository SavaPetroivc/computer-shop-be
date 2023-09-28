import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { RoleInUserOverviewDto } from "../../role/dto/role-in-user-overview.dto";

export class UserOverviewDto {
  @AutoMap()
  @ApiProperty()
  id: number;
  @AutoMap()
  @ApiProperty()
  firstName: string;
  @AutoMap()
  @ApiProperty()
  lastName: string;
  @AutoMap()
  @ApiProperty()
  username: string;
  @ApiProperty()
  @AutoMap(() => RoleInUserOverviewDto)
  role: RoleInUserOverviewDto;
}
