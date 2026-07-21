import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../order/entities/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderDeliveryInfoService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}
}
