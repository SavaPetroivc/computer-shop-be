import { AutoMap } from "@automapper/classes";
import { UserContactInfoGetDto } from "./user-contact-info-get.dto";

export class UserOrderCreatedDto {
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  username: string;
  @AutoMap(() => UserContactInfoGetDto)
  userContactInfo: UserContactInfoGetDto;
}
