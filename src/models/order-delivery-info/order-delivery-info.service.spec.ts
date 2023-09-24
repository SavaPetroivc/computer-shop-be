import { Test, TestingModule } from '@nestjs/testing';
import { OrderDeliveryInfoService } from './order-delivery-info.service';

describe('OrderDeliveryInfoService', () => {
  let service: OrderDeliveryInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderDeliveryInfoService],
    }).compile();

    service = module.get<OrderDeliveryInfoService>(OrderDeliveryInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
