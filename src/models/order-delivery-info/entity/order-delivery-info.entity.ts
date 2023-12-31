import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "../../city/entity/city.entity";
import { Order } from "../../order/entities/order.entity";
import { AutoMap } from "@automapper/classes";

@Entity("order_delivery_info", { schema: "computer_shop" })
export class OrderDeliveryInfo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @AutoMap()
  @Column("varchar", { name: "zip", length: 128 })
  zip: string;

  @AutoMap()
  @Column("varchar", { name: "street", length: 128 })
  street: string;

  @AutoMap()
  @Column("varchar", { name: "number", length: 128 })
  number: string;

  @AutoMap()
  @ManyToOne(() => City, (city) => city.orderDeliveryInfos, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
  city: City;

  @OneToOne(() => Order, (order) => order.orderDeliveryInfo, { eager: true })
  @JoinColumn({ name: "order_id", referencedColumnName: "id" })
  order: Order;
}
