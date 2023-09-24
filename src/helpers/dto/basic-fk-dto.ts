import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class BasicFkDto {
  @AutoMap()
  @ApiProperty()
  id: string;
}
