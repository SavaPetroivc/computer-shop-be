import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "../../product/entity/product.entity";
import { Order } from "./order.entity";

@Entity("order_products", { schema: "computer_shop" })
export class OrderProducts {
  @PrimaryColumn({ type: "int", insert: false, select: false, update: false })
  id: never;

  @Column("int", { name: "quantity" })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderProducts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderProducts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "order_id", referencedColumnName: "id" }])
  order: Order;
}
