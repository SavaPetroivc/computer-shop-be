import { AutoMap } from "@automapper/classes";
import { UserOrderCreatedDto } from "../../user/dto/user-order-created.dto";
import { OrderDeliveryInfoDto } from "./order-delivery-info.dto";
import {OrderProductsInOrderDto} from "./order-products-in-order.dto";

export class OrderByIdDto {
  @AutoMap()
  id: number;
  @AutoMap()
  date: number;
  @AutoMap()
  total: number;
  @AutoMap(()=>OrderProductsInOrderDto)
  orderProducts:OrderProductsInOrderDto
  @AutoMap(() => UserOrderCreatedDto)
  user: UserOrderCreatedDto;
  @AutoMap(() => OrderDeliveryInfoDto)
  orderDeliveryInfo: OrderDeliveryInfoDto;
}
