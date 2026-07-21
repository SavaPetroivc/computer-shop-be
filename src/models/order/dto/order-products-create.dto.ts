import { AutoMap } from "@automapper/classes";
import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min, ValidateNested } from "class-validator";

export class OrderProductsCreateDto {
  @AutoMap(() => BasicFkDto)
  @Type(() => BasicFkDto)
  @ValidateNested()
  @ApiProperty()
  product: BasicFkDto;

  @ApiProperty({ minimum: 1 })
  @AutoMap()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity: number;
}
