import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { Role } from "../entity/role.entity";
import { RoleInUserOverviewDto } from "../dto/role-in-user-overview.dto";
import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";

export class RoleAutomapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Role, RoleInUserOverviewDto);
      createMap(mapper, BasicFkDto, Role);
    };
  }
}
