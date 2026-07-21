import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { CityDto } from "../../city/dto/city.dto";

export class UserContactInfoGetDto {
  @AutoMap()
  @ApiProperty()
  email: string;
  @AutoMap()
  @ApiProperty()
  contactPhone: string;
  @AutoMap()
  @ApiProperty({ required: false })
  street: string;
  @AutoMap()
  @ApiProperty({ required: false })
  number: string;
  @AutoMap()
  @ApiProperty({ required: false })
  zip: string;
  @AutoMap(() => CityDto)
  @ApiProperty({ type: CityDto, required: false })
  city: CityDto;
}
