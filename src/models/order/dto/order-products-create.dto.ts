import { AutoMap } from "@automapper/classes";
import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";
import { ApiProperty } from "@nestjs/swagger";

export class OrderProductsCreateDto {
  @AutoMap(() => BasicFkDto)
  @ApiProperty()
  product: BasicFkDto;

  @ApiProperty()
  @AutoMap()
  quantity: number;
}
