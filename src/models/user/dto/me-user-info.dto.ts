import { AutoMap } from "@automapper/classes";
import { UserContactInfoGetDto } from "./user-contact-info-get.dto";

export class MeUserInfoDto {
  @AutoMap()
  id: number;
  @AutoMap()
  username: string;
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  role: string;
  @AutoMap()
  activated: boolean;
  @AutoMap(() => UserContactInfoGetDto)
  userContactInfo: UserContactInfoGetDto;
}
