import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class BasicFkDto {
  @AutoMap()
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  id: number;
}
