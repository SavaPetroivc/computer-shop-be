import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { City } from "../entity/city.entity";
import { CityDto } from "../dto/city.dto";

export class CityProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, City, CityDto);
    };
  }
}
