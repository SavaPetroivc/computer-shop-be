import { AutoMap } from "@automapper/classes";
import { UserContactInfoGetDto } from "./user-contact-info-get.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserOrderCreatedDto {
  @AutoMap()
  @ApiProperty()
  firstName: string;
  @AutoMap()
  @ApiProperty()
  lastName: string;
  @AutoMap()
  @ApiProperty()
  username: string;
  @ApiProperty({ type: UserContactInfoGetDto })
  @AutoMap(() => UserContactInfoGetDto)
  userContactInfo: UserContactInfoGetDto;
}
