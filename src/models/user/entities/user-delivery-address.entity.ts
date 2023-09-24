import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { City } from "../../city/entity/city.entity";

@Entity("user_delivery_address", { schema: "computer_shop" })
export class UserDeliveryAddress {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "zip", length: 128 })
  zip: string;

  @Column("varchar", { name: "street", length: 128 })
  street: string;

  @Column("varchar", { name: "number", length: 128 })
  number: string;

  @ManyToOne(() => User, (user) => user.userDeliveryAddresses, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => City, (city) => city.userDeliveryAddresses, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
  city: City;
}
