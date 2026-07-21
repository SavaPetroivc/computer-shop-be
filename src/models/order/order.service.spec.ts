import { BadRequestException } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Order } from "./entities/order.entity";
import { OrderProducts } from "./entities/order-products.entity";
import { Product } from "../product/entity/product.entity";
import { OrderStatus } from "./enums/order-status.enum";

describe("OrderService", () => {
  const product = (id: number, price: number, quantity: number): Product =>
    ({ id, name: `proizvod-${id}`, price, quantity }) as Product;

  const orderProduct = (productId: number, quantity: number): OrderProducts =>
    ({ product: { id: productId }, quantity }) as OrderProducts;

  const orderFor = (orderProducts: OrderProducts[]): Order =>
    ({ orderProducts }) as Order;

  /** Mock queryRunner-a koji vraca zadate proizvode iz zakljucanog SELECT-a. */
  const setup = (stock: Product[]) => {
    const find = jest.fn(async () => stock);
    const decrement = jest.fn();
    const save = jest.fn(async (order: Order) => order);

    const queryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        getRepository: (entity: unknown) =>
          entity === Product ? { find, decrement } : { save },
      },
    };

    const service = new OrderService(
      {} as any,
      { createQueryRunner: () => queryRunner } as any,
      {} as any,
    );

    return { service, queryRunner, find, decrement, save };
  };

  describe("sumOrderTotal", () => {
    it("sabira kolicinu puta zapamcenu cenu stavke", () => {
      const { service } = setup([]);

      const total = service.sumOrderTotal([
        { quantity: 2, price: 100 } as OrderProducts,
        { quantity: 3, price: 50 } as OrderProducts,
      ]);

      expect(total).toBe(350);
    });
  });

  describe("createOrder - odbijanje", () => {
    const expectRollback = async (
      stock: Product[],
      orderProducts: OrderProducts[],
      message: RegExp | typeof BadRequestException,
    ) => {
      const { service, queryRunner, save } = setup(stock);

      await expect(
        service.createOrder(orderFor(orderProducts)),
      ).rejects.toThrow(message as any);

      expect(save).not.toHaveBeenCalled();
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(queryRunner.commitTransaction).not.toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
    };

    it("odbija porudzbinu ako proizvod vise ne postoji", async () => {
      await expectRollback([], [orderProduct(1, 1)], BadRequestException);
    });

    it("odbija porudzbinu za rasprodat proizvod", async () => {
      await expectRollback(
        [product(1, 100, 0)],
        [orderProduct(1, 1)],
        /out of stock/,
      );
    });

    it("odbija porudzbinu vecu od raspolozive kolicine", async () => {
      await expectRollback(
        [product(1, 100, 3)],
        [orderProduct(1, 5)],
        /only 3 left/,
      );
    });

    it("zadrzava originalni HTTP status umesto da ga pretvori u 500", async () => {
      const { service } = setup([]);

      await expect(
        service.createOrder(orderFor([orderProduct(1, 1)])),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe("createOrder - uspesan tok", () => {
    it("zapamti cenu, izracuna ukupno, skine lager i commit-uje", async () => {
      const stock = [product(1, 100, 10), product(2, 50, 10)];
      const { service, queryRunner, decrement, save } = setup(stock);

      const order = orderFor([orderProduct(1, 2), orderProduct(2, 3)]);
      await service.createOrder(order);

      // snapshot cene je upisan u svaku stavku
      expect(order.orderProducts.map((oP) => oP.price)).toEqual([100, 50]);
      expect(order.total).toBe(350);
      expect(order.status).toBe(OrderStatus.IN_PREPARATION);

      expect(save).toHaveBeenCalledWith(order);
      expect(decrement).toHaveBeenCalledTimes(2);
      expect(decrement).toHaveBeenCalledWith({ id: 1 }, "quantity", 2);
      expect(decrement).toHaveBeenCalledWith({ id: 2 }, "quantity", 3);

      expect(queryRunner.commitTransaction).toHaveBeenCalled();
      expect(queryRunner.rollbackTransaction).not.toHaveBeenCalled();
      expect(queryRunner.release).toHaveBeenCalled();
    });

    it("zakljucava redove proizvoda unutar transakcije", async () => {
      const { service, queryRunner, find } = setup([product(1, 100, 10)]);

      await service.createOrder(orderFor([orderProduct(1, 1)]));

      expect(queryRunner.startTransaction).toHaveBeenCalled();
      expect(find).toHaveBeenCalledWith(
        expect.objectContaining({ lock: { mode: "pessimistic_write" } }),
      );
    });
  });
});
