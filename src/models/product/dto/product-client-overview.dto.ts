import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class ProductClientOverviewDto {
  @AutoMap()
  @ApiProperty()
  name: string;
  @AutoMap()
  @ApiProperty()
  price: string;
}
