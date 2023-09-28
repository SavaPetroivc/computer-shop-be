import { UserCreateDto } from "./user-create.dto";
import { AutoMap } from "@automapper/classes";
import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";
import { MinLength, ValidateNested } from "class-validator";
import { UserContactInfoCreateDto } from "./user-contact-info.create.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UserAsEmployeeCreateDto {
  @AutoMap()
  @ApiProperty()
  @MinLength(6)
  username: string;
  @AutoMap()
  @ApiProperty()
  firstName: string;
  @AutoMap()
  @ApiProperty()
  lastName: string;
  @AutoMap(() => UserContactInfoCreateDto)
  @ApiProperty()
  @Type(() => UserContactInfoCreateDto)
  @ValidateNested()
  userContactInfo: UserContactInfoCreateDto;
  @AutoMap(() => BasicFkDto)
  @ApiProperty()
  role: BasicFkDto;
}
