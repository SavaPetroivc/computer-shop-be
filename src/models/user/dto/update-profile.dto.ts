import { AutoMap } from "@automapper/classes";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { UserContactInfoCreateDto } from "./user-contact-info.create.dto";

export class UpdateProfileDto {
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
}
