import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { Product } from "../../product/entity/product.entity";
import { OrderCreateDto } from "../dto/order-create.dto";
import { Order } from "../entities/order.entity";

export class OrderProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, OrderCreateDto, Order);
    };
  }
}
