import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
  mapWith,
} from "@automapper/core";
import { Product } from "../../product/entity/product.entity";
import { OrderCreateDto } from "../dto/order-create.dto";
import { Order } from "../entities/order.entity";
import { OrderByIdDto } from "../dto/order-by-id.dto";
import { OrderDeliveryInfo } from "../../order-delivery-info/entity/order-delivery-info.entity";
import { OrderDeliveryInfoDto } from "../dto/order-delivery-info.dto";
import { OrderDeliveryCreateDto } from "../../order-delivery-info/dto/order-delivery-create.dto";
import { UserOrderCreatedDto } from "../../user/dto/user-order-created.dto";
import { User } from "../../user/entities/user.entity";
import { OrderProducts } from "../entities/order-products.entity";
import { OrderProductsInOrderDto } from "../dto/order-products-in-order.dto";

export class OrderProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, OrderCreateDto, Order);
      createMap(
        mapper,
        Order,
        OrderByIdDto,
        forMember(
          (destination) => destination.user,
          mapWith(UserOrderCreatedDto, User, (source) => source.user),
        ),
        forMember(
          (destination) => destination.orderDeliveryInfo,
          mapWith(
            OrderDeliveryInfoDto,
            OrderDeliveryInfo,
            (source) => source.orderDeliveryInfo,
          ),
        ),
        forMember(
          (destination) => destination.orderProducts,
          mapWith(
            OrderProductsInOrderDto,
            OrderProducts,
            (source) => source.orderProducts,
          ),
        ),
      );
      createMap(
        mapper,
        OrderDeliveryInfo,
        OrderDeliveryInfoDto,
        forMember(
          (destination) => destination.city,
          mapFrom((source) => source.city.name),
        ),
      );
      createMap(
        mapper,
        OrderProducts,
        OrderProductsInOrderDto,
        forMember(
          (destination) => destination.orderQuantity,
          mapFrom((source) => source.quantity),
        ),

        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.product.name),
        ),
        forMember(
          (destination) => destination.price,
          mapFrom((source) => source.product.price),
        ),
      );
    };
  }
}
