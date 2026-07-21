import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";

export class OrderDeliveryCreateDto {
  @AutoMap(() => BasicFkDto)
  @Type(() => BasicFkDto)
  @IsOptional()
  @ValidateNested()
  @ApiProperty({ required: false })
  city: BasicFkDto;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  zip: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  street: string;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  number: string;
}
