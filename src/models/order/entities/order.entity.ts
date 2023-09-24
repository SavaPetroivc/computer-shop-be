import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {OrderProducts} from "./order-products.entity";

@Entity("order", { schema: "computer_shop" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "date", default: () => "'curdate()'" })
  date: string;

  @Column("double", { name: "total", precision: 22 })
  total: number;

  @Column("int", { name: "quantity" })
  quantity: number;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @OneToMany(() => OrderProducts, (orderProducts) => orderProducts.order)
  orderProducts: OrderProducts[];
}
