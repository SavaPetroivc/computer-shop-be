import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { UserCreateDto } from "../dto/user-create.dto";
import { User } from "../entities/user.entity";
import { UserAsEmployeeCreateDto } from "../dto/user-as-employee-create.dto";
import { UserUpdateDto } from "../dto/user-update.dto";

export class UserAutomapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, UserCreateDto, User);
      createMap(mapper, UserAsEmployeeCreateDto, User);
      createMap(mapper, UserUpdateDto, User);
    };
  }
}
