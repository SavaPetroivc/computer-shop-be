import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class OrderDeliveryInfoDto {
  @AutoMap()
  @ApiProperty()
  street: string;
  @AutoMap()
  @ApiProperty()
  number: string;
  @ApiProperty()
  @AutoMap()
  city: string;
  @ApiProperty()
  @AutoMap()
  zip: string;
}
