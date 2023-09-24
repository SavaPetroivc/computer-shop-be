import { Module } from '@nestjs/common';
import { OrderDeliveryInfoService } from './order-delivery-info.service';
import { OrderDeliveryInfoController } from './order-delivery-info.controller';

@Module({
  controllers: [OrderDeliveryInfoController],
  providers: [OrderDeliveryInfoService]
})
export class OrderDeliveryInfoModule {}
