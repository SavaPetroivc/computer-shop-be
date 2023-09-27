import { AutoMap } from "@automapper/classes";
import { UserOrderCreatedDto } from "../../user/dto/user-order-created.dto";
import { ApiProperty } from "@nestjs/swagger";

export class OrderProductsInOrderDto {
  @AutoMap()
  @ApiProperty()
  name: string;
  @AutoMap()
  @ApiProperty()
  price: number;
  @AutoMap()
  @ApiProperty()
  orderQuantity: number;
  @AutoMap(() => UserOrderCreatedDto)
  @ApiProperty()
  user: UserOrderCreatedDto;
}
