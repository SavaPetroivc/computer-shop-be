import { AutoMap } from "@automapper/classes";
import { MinLength, ValidateNested } from "class-validator";
import { UserContactInfoCreateDto } from "./user-contact-info.create.dto";
import { Type } from "class-transformer";

export class UserUpdateDto {
  @AutoMap()
  @MinLength(6)
  username: string;
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap(() => UserContactInfoCreateDto)
  @Type(() => UserContactInfoCreateDto)
  @ValidateNested()
  userContactInfo: UserContactInfoCreateDto;
}
