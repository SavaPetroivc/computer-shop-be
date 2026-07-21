import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class ProductCreateDto {
  @AutoMap()
  @ApiProperty()
  name: string;
  @AutoMap()
  @ApiProperty()
  @IsNumber()
  price: number;
  @AutoMap()
  @ApiProperty()
  @IsNumber()
  quantity: number;
  @AutoMap()
  @ApiProperty({ required: false })
  @IsOptional()
  imageUrl: string;
}
