import { AutoMap } from "@automapper/classes";
import { IsOptional, IsPhoneNumber, Matches, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";

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
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  street: string;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  number: string;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  zip: string;
  @AutoMap(() => BasicFkDto)
  @ApiProperty({ type: BasicFkDto, required: false })
  @IsOptional()
  @Type(() => BasicFkDto)
  @ValidateNested()
  city: BasicFkDto;
}
