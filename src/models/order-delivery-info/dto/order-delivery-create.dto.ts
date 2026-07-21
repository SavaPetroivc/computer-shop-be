import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class OrderDeliveryCreateDto {
  @AutoMap(() => BasicFkDto)
  @Type(() => BasicFkDto)
  @ApiProperty()
  city: BasicFkDto;

  @AutoMap()
  @ApiProperty()
  zip: string;

  @AutoMap()
  @ApiProperty()
  street: string;

  @AutoMap()
  @ApiProperty()
  number: string;
}
