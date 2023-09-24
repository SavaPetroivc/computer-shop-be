import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";
import { AutoMap } from "@automapper/classes";
import { OrderDeliveryCreateDto } from "../../order-delivery-info/dto/order-delivery-create.dto";
import { OrderProductsCreateDto } from "./order-products-create.dto";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class OrderCreateDto {
  @ApiProperty()
  @AutoMap(() => [OrderProductsCreateDto])
  @IsNotEmpty()
  orderProducts: OrderProductsCreateDto[];
  @ApiProperty()
  @AutoMap(() => OrderDeliveryCreateDto)
  @IsNotEmpty()
  orderDeliveryInfo: OrderDeliveryCreateDto;
}
