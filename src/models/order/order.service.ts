import { Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderProducts } from "./entities/order-products.entity";
import { ProductService } from "../product/product.service";
import { ProductPrice } from "../product/model/product-price.model";
import { UnhandledException } from "../../helpers/exception/unhandled.exception";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject(DataSource) private dataSource: DataSource,
    private productService: ProductService,
  ) {}

  async createOrder(order: Order): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    await queryRunner.connect();
    try {
      order.total = await this.sumOrderTotal(order.orderProducts);
      const createdOrder = await queryRunner.manager.getRepository(Order).save(order)
      await queryRunner.commitTransaction();

      return createdOrder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new UnhandledException(err);
    } finally {
      await queryRunner.release();
    }
  }

  async sumOrderTotal(orderProducts: OrderProducts[]): Promise<number> {
    const products: ProductPrice[] = await this.productService.getProductsByIds(
      orderProducts.map((oP) => oP.product.id),
    );

    return orderProducts
      .map((oP, index) => ({ ...oP, ...products[index] }))
      .reduce((sum, currentValue) => {
        sum += currentValue.quantity * currentValue.price;
        return sum;
      }, 0);
  }
}
