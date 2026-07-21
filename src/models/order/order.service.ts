import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderProducts } from "./entities/order-products.entity";
import { ProductService } from "../product/product.service";
import { UnhandledException } from "../../helpers/exception/unhandled.exception";
import { Product } from "../product/entity/product.entity";
import { OrderByIdDto } from "./dto/order-by-id.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { MostPopularProductsDto } from "./dto/most-popular-products.dto";
import { OrderStatus } from "./enums/order-status.enum";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject(DataSource) private dataSource: DataSource,
    private productService: ProductService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async createOrder(order: Order): Promise<void> {
    const products = await this.productService.getProductsByIds(
      order.orderProducts.map((oP) => oP.product.id),
    );
    this.assertStockAvailable(order.orderProducts, products);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      order.total = this.sumOrderTotal(order.orderProducts, products);
      order.status = OrderStatus.IN_PREPARATION;
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

  private assertStockAvailable(
    orderProducts: OrderProducts[],
    products: Product[],
  ): void {
    for (const orderProduct of orderProducts) {
      const product = products.find(
        (p) => Number(p.id) === Number(orderProduct.product.id),
      );

      if (!product) {
        throw new BadRequestException(
          "One of the ordered products no longer exists.",
        );
      }
      if (product.quantity < 1) {
        throw new BadRequestException(`"${product.name}" is out of stock.`);
      }
      if (product.quantity < orderProduct.quantity) {
        throw new BadRequestException(
          `Not enough stock for "${product.name}" - only ${product.quantity} left.`,
        );
      }
    }
  }

  sumOrderTotal(orderProducts: OrderProducts[], products: Product[]): number {
    return orderProducts.reduce((sum, orderProduct) => {
      const product = products.find(
        (p) => Number(p.id) === Number(orderProduct.product.id),
      );
      return sum + orderProduct.quantity * (product?.price ?? 0);
    }, 0);
  }

  async getOrders(): Promise<OrderByIdDto[]> {
    try {
      const orderById: Order[] = await this.orderRepository.find({
        relations: {
          user: { userContactInfo: true },
          orderProducts: { product: true },
          orderDeliveryInfo: { city: true },
        },
      });
      return this.classMapper.mapArray(orderById, Order, OrderByIdDto);
    } catch (err) {
      throw new UnhandledException(err);
    }
  }

  async getMostPopularProducts(): Promise<MostPopularProductsDto[]> {
    try {
      const qb = this.orderRepository.createQueryBuilder("order");
      const response: any[] = await qb
        .select(
          "product.id,product.price,product.name,product.image_url,product.quantity,count(orderProducts.product.id)*orderProducts.quantity as amount",
        )
        .innerJoin("order.orderProducts", "orderProducts")
        .innerJoin("orderProducts.product", "product")
        .groupBy("orderProducts.product.id")
        .limit(4)
        .orderBy("amount", "DESC")
        .getRawMany();

      return response.map(({ name, price, id, image_url, quantity }) => ({
        name,
        price,
        id,
        quantity,
        imageUrl: image_url,
      }));
    } catch (err) {
      throw new UnhandledException(err);
    }
  }
  async updateStatus(orderId: number, status: OrderStatus): Promise<void> {
    try {
      await this.orderRepository.update(orderId, { status });
    } catch (err) {
      throw new UnhandledException(err);
    }
  }

  async getOrdersByUser(userId: number): Promise<OrderByIdDto[]> {
    try {
      const orderById: Order[] = await this.orderRepository.find({
        relations: {
          user: { userContactInfo: true },
          orderProducts: { product: true },
          orderDeliveryInfo: { city: true },
        },
        where:{user:{id:userId}}
      });
      return this.classMapper.mapArray(orderById, Order, OrderByIdDto);
    } catch (err) {
      throw new UnhandledException(err);
    }
  }
}
