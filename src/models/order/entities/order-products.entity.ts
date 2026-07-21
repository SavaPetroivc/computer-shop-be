import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "../../product/entity/product.entity";
import { Order } from "./order.entity";
import { AutoMap } from "@automapper/classes";
import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";

@Entity("order_products", { schema: "computer_shop" })
export class OrderProducts {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @AutoMap()
  @Column({ type: "int", name: "quantity" })
  quantity: number;

  @AutoMap(() => BasicFkDto)
  @ManyToOne(() => Product, (product) => product.orderProducts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  @JoinColumn([{ name: "order_id", referencedColumnName: "id" }])
  order: Order;
}
