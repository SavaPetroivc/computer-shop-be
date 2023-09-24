import { Test, TestingModule } from '@nestjs/testing';
import { OrderDeliveryInfoController } from './order-delivery-info.controller';
import { OrderDeliveryInfoService } from './order-delivery-info.service';

describe('OrderDeliveryInfoController', () => {
  let controller: OrderDeliveryInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderDeliveryInfoController],
      providers: [OrderDeliveryInfoService],
    }).compile();

    controller = module.get<OrderDeliveryInfoController>(OrderDeliveryInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
