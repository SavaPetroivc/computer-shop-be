import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderProducts } from "../../order/entities/order-products.entity";
import { AutoMap } from "@automapper/classes";

@Entity("product", { schema: "computer_shop" })
export class Product {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @AutoMap()
  @Column("varchar", { name: "name", length: 128 })
  name: string;

  @AutoMap()
  @Column("double", { name: "price", precision: 22 })
  price: number;

  @AutoMap()
  @Column("double", { name: "quantity", precision: 22 })
  quantity: number;

  @OneToMany(() => OrderProducts, (orderProducts) => orderProducts.product)
  orderProducts: OrderProducts[];
}
