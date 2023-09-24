import { AutoMap } from "@automapper/classes";
import {UserOrderCreatedDto} from "../../user/dto/user-order-created.dto";

export class OrderProductsInOrderDto {
  @AutoMap()
  name: string;
  @AutoMap()
  price: number;
  @AutoMap()
  orderQuantity: number;
  @AutoMap(() => UserOrderCreatedDto)
  user: UserOrderCreatedDto;
}
