import { AutoMap } from "@automapper/classes";
import { OrderDeliveryCreateDto } from "../../order-delivery-info/dto/order-delivery-create.dto";
import { OrderProductsCreateDto } from "./order-products-create.dto";
import { ArrayNotEmpty, IsNotEmpty, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class OrderCreateDto {
  @ApiProperty({ isArray: true, type: OrderProductsCreateDto })
  @AutoMap(() => [OrderProductsCreateDto])
  @Type(() => OrderProductsCreateDto)
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  orderProducts: OrderProductsCreateDto[];

  @ApiProperty()
  @AutoMap(() => OrderDeliveryCreateDto)
  @Type(() => OrderDeliveryCreateDto)
  @IsNotEmpty()
  @ValidateNested()
  orderDeliveryInfo: OrderDeliveryCreateDto;
}
