import { Controller, Get } from "@nestjs/common";
import { CityService } from "./city.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CityDto } from "./dto/city.dto";
@ApiTags("cities")
@Controller("cities")
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  @ApiOkResponse({ type: CityDto, isArray: true })
  async getCities() {
    return await this.cityService.getCities();
  }
}
