import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {OrderProducts} from "../../order/entities/order-products.entity";

@Entity("product", { schema: "computer_shop" })
export class Product {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 128 })
  name: string;

  @Column("double", { name: "price", precision: 22 })
  price: number;

  @Column("double", { name: "quantity", precision: 22 })
  quantity: number;

  @OneToMany(() => OrderProducts, (orderProducts) => orderProducts.product)
  orderProducts: OrderProducts[];
}
