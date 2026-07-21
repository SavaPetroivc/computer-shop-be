import { ProductCreateDto } from "./product-create.dto";
import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProductUpdateDto extends ProductCreateDto {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
