import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from "@automapper/core";
import { Product } from "../../product/entity/product.entity";
import { OrderCreateDto } from "../dto/order-create.dto";
import { Order } from "../entities/order.entity";
import { OrderByIdDto } from "../dto/order-by-id.dto";
import { OrderDeliveryInfo } from "../../order-delivery-info/entity/order-delivery-info.entity";
import { OrderDeliveryInfoDto } from "../dto/order-delivery-info.dto";
import { OrderDeliveryCreateDto } from "../../order-delivery-info/dto/order-delivery-create.dto";

export class OrderProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, OrderCreateDto, Order);
      createMap(mapper, Order, OrderByIdDto);
      createMap(mapper, OrderDeliveryInfo, OrderDeliveryInfoDto);
      createMap(
        mapper,
        OrderDeliveryInfo,
        OrderDeliveryInfoDto,
        forMember(
          (destination) => destination.city,
          mapFrom((source) => source.city.name),
        ),
      );
    };
  }
}
