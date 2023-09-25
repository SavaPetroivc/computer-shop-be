import { Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderProducts } from "./entities/order-products.entity";
import { ProductService } from "../product/product.service";
import { ProductPrice } from "../product/model/product-price.model";
import { UnhandledException } from "../../helpers/exception/unhandled.exception";
import { Product } from "../product/entity/product.entity";
import { OrderByIdDto } from "./dto/order-by-id.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject(DataSource) private dataSource: DataSource,
    private productService: ProductService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async createOrder(order: Order): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      order.total = await this.sumOrderTotal(order.orderProducts);
      const createdOrder = await queryRunner.manager
        .getRepository(Order)
        .save(order);
      for (const orderProducts of createdOrder.orderProducts) {
        await queryRunner.manager
          .getRepository(Product)
          .decrement(
            { id: orderProducts.product.id },
            "quantity",
            orderProducts.quantity,
          );
      }
      await queryRunner.commitTransaction();
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

  async getOrderById(id: number): Promise<OrderByIdDto> {
    try {
      const orderById: Order = await this.orderRepository
        .createQueryBuilder("order")
        .innerJoinAndSelect("order.user", "user")
        .innerJoinAndSelect("user.userContactInfo", "userContactInfo")
        .innerJoinAndSelect("order.orderProducts", "orderProducts")
        .innerJoinAndSelect("orderProducts.product", "product")
        .innerJoinAndSelect("order.orderDeliveryInfo", "orderDeliveryInfo")
        .innerJoinAndSelect("orderDeliveryInfo.city", "city")
        .getOne();
      return this.classMapper.map(orderById, Order, OrderByIdDto);
    } catch (err) {
      throw new UnhandledException(err);
    }
  }
  async getOrders(id: number): Promise<OrderByIdDto[]> {
    try {
      const orders: Order[] = await this.orderRepository.find({
        relations: {
          user: true,
        },
      });
      return this.classMapper.mapArray(orders, Order, OrderByIdDto);
    } catch (err) {
      throw new UnhandledException(err);
    }
  }
}
