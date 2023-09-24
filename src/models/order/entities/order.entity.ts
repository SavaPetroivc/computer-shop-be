import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { OrderProducts } from "./order-products.entity";
import { OrderDeliveryInfo } from "../../order-delivery-info/entity/order-delivery-info.entity";
import { AutoMap } from "@automapper/classes";
import { OrderDeliveryCreateDto } from "../../order-delivery-info/dto/order-delivery-create.dto";
import { OrderProductsCreateDto } from "../dto/order-products-create.dto";
import { UserContactInfoGetDto } from "../../user/dto/user-contact-info-get.dto";
import { UserOrderCreatedDto } from "../../user/dto/user-order-created.dto";
import { OrderDeliveryInfoDto } from "../dto/order-delivery-info.dto";
import {OrderProductsInOrderDto} from "../dto/order-products-in-order.dto";

@Entity("order", { schema: "computer_shop" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @AutoMap()
  @Column("date", { name: "date", default: () => "'curdate()'" })
  date: string;

  @AutoMap()
  @Column("double", { name: "total", precision: 22 })
  total: number;

  @AutoMap(() => UserOrderCreatedDto)
  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @AutoMap(() => [OrderProductsCreateDto])
  @AutoMap(() => [OrderProductsInOrderDto])
  @OneToMany(() => OrderProducts, (orderProducts) => orderProducts.order, {
    cascade: ["insert", "update"],
  })
  orderProducts: OrderProducts[];

  @AutoMap(() => OrderDeliveryInfoDto)
  @OneToOne(() => OrderDeliveryInfo, (deliveryInfo) => deliveryInfo.order, {
    cascade: true,
  })
  orderDeliveryInfo: OrderDeliveryInfo;
}
