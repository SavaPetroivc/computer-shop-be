import { AutoMap } from "@automapper/classes";
import { UserContactInfoCreateDto } from "./user-contact-info.create.dto";
import { MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {
  @AutoMap()
  @ApiProperty()
  @MinLength(6)
  username: string;
  @AutoMap()
  @ApiProperty()
  @MinLength(6)
  password: string;
  @AutoMap()
  @ApiProperty()
  firstName: string;
  @AutoMap()
  @ApiProperty()
  lastName: string;
  @AutoMap(() => UserContactInfoCreateDto)
  @Type(() => UserContactInfoCreateDto)
  @ValidateNested()
  @ApiProperty()
  userContactInfo: UserContactInfoCreateDto;
}
