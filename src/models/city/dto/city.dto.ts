import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class CityDto {
  @AutoMap()
  @ApiProperty()
  id: number;
  @AutoMap()
  @ApiProperty()
  name: string;
}
