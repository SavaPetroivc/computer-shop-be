import { AutoMap } from "@automapper/classes";
import { UserOrderCreatedDto } from "../../user/dto/user-order-created.dto";
import { OrderDeliveryInfoDto } from "./order-delivery-info.dto";
import { OrderProductsInOrderDto } from "./order-products-in-order.dto";
import { ApiProperty } from "@nestjs/swagger";

export class OrderByIdDto {
  @AutoMap()
  @ApiProperty()
  id: number;
  @ApiProperty()
  @AutoMap()
  date: number;
  @AutoMap()
  @ApiProperty()
  total: number;
  @AutoMap(() => [OrderProductsInOrderDto])
  @ApiProperty({type:[OrderProductsInOrderDto]})
  orderProducts: OrderProductsInOrderDto[];
  @ApiProperty({type:UserOrderCreatedDto})
  @AutoMap(() => UserOrderCreatedDto)
  user: UserOrderCreatedDto;
  @ApiProperty({type:OrderDeliveryInfoDto})
  @AutoMap(() => OrderDeliveryInfoDto)
  orderDeliveryInfo: OrderDeliveryInfoDto;
}
