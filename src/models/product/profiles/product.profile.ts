import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { Product } from "../entity/product.entity";
import { ProductCreateDto } from "../dto/product-create.dto";
import { ProductClientOverviewDto } from "../dto/product-client-overview.dto";

export class ProductProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, ProductCreateDto, Product);
      createMap(mapper, Product, ProductClientOverviewDto);
    };
  }
}
