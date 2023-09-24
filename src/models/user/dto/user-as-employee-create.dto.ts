import { UserCreateDto } from "./user-create.dto";
import { AutoMap } from "@automapper/classes";
import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";
import { MinLength, ValidateNested } from "class-validator";
import { UserContactInfoCreateDto } from "./user-contact-info.create.dto";
import { Type } from "class-transformer";

export class UserAsEmployeeCreateDto extends UserCreateDto {
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
  @AutoMap(() => BasicFkDto)
  role: BasicFkDto;
}
