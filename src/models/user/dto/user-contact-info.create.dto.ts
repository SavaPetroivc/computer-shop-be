import { AutoMap } from "@automapper/classes";
import { IsPhoneNumber, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserContactInfoCreateDto {
  @AutoMap()
  @ApiProperty()
  @Matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, {
    message: "String should me email",
  })
  email: string;
  @AutoMap()
  @ApiProperty()
  @IsPhoneNumber()
  contactPhone: string;
}
