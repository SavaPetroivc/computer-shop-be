import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
  createMap,
  forMember,
  mapFrom,
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
import { UserContactInfoCreateDto } from "../dto/user-contact-info.create.dto";
import { MeUserInfoDto } from "../dto/me-user-info.dto";
import { UserOverviewDto } from "../dto/user-overview.dto";
import { Role } from "../../role/entity/role.entity";
import { RoleInUserOverviewDto } from "../../role/dto/role-in-user-overview.dto";
import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";

export class UserAutomapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        UserCreateDto,
        User,
        forMember(
          (destination) => destination.userContactInfo,
          mapWith(
            UserContactInfo,
            UserContactInfoCreateDto,
            (source) => source.userContactInfo,
          ),
        ),
      );
      createMap(
        mapper,
        UserAsEmployeeCreateDto,
        User,
        forMember(
          (destination) => destination.userContactInfo,
          mapWith(
            UserContactInfo,
            UserContactInfoCreateDto,
            (source) => source.userContactInfo,
          ),
        ),
        forMember(
          (destination) => destination.role,
          mapWith(Role, BasicFkDto, (source) => source.role),
        ),
      );
      createMap(mapper, UserUpdateDto, User);
      createMap(mapper, UserContactInfo, UserContactInfoGetDto);
      createMap(mapper, UserContactInfoCreateDto, UserContactInfo);
      createMap(
        mapper,
        User,
        MeUserInfoDto,
        forMember(
          (destination) => destination.role,
          mapFrom((source) => source.role.role),
        ),
      );
      createMap(
        mapper,
        User,
        UserOverviewDto,
        forMember(
          (destination) => destination.role,
          mapWith(RoleInUserOverviewDto, Role, (source) => source.role),
        ),
      );
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
