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

@Entity("order", { schema: "computer_shop" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "date", default: () => "'curdate()'" })
  date: string;

  @Column("double", { name: "total", precision: 22 })
  total: number;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @AutoMap(() => OrderProductsCreateDto)
  @OneToMany(() => OrderProducts, (orderProducts) => orderProducts.order, {
    cascade: ["insert", "update"],
  })
  orderProducts: OrderProducts[];

  @AutoMap(() => OrderDeliveryCreateDto)
  @OneToOne(() => OrderDeliveryInfo, (deliveryInfo) => deliveryInfo.order, {
    cascade: true,
  })
  orderDeliveryInfo: OrderDeliveryInfo;
}
