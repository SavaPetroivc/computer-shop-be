import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
  createMap,
  forMember,
  Mapper,
  MappingProfile,
  mapWith,
} from "@automapper/core";
import { UserCreateDto } from "../dto/user-create.dto";
import { User } from "../entities/user.entity";
import { UserAsEmployeeCreateDto } from "../dto/user-as-employee-create.dto";
import { UserUpdateDto } from "../dto/user-update.dto";
import { UserOrderCreatedDto } from "../dto/user-order-created.dto";
import { UserContactInfoGetDto } from "../dto/user-contact-info-get.dto";
import { UserContactInfo } from "../entities/user-contact-info.entity";

export class UserAutomapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, UserCreateDto, User);
      createMap(mapper, UserAsEmployeeCreateDto, User);
      createMap(mapper, UserUpdateDto, User);
      createMap(mapper, UserContactInfo, UserContactInfoGetDto);
      createMap(
        mapper,
        User,
        UserOrderCreatedDto,
        forMember(
          (destination) => destination.userContactInfo,
          mapWith(
            UserContactInfoGetDto,
            UserContactInfo,
            (source) => source.userContactInfo,
          ),
        ),
      );
    };
  }
}
