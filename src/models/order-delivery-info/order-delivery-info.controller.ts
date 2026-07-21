import { Controller } from '@nestjs/common';
import { OrderDeliveryInfoService } from './order-delivery-info.service';

@Controller('order-delivery-info')
export class OrderDeliveryInfoController {
  constructor(private readonly orderDeliveryInfoService: OrderDeliveryInfoService) {}
}
