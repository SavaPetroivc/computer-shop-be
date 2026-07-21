import { AutoMap } from "@automapper/classes";
import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class OrderProductsCreateDto {
  @AutoMap(() => BasicFkDto)
  @Type(() => BasicFkDto)
  @ApiProperty()
  product: BasicFkDto;

  @ApiProperty()
  @AutoMap()
  quantity: number;
}
