import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserDeliveryAddress } from "../../user/entities/user-delivery-address.entity";

@Entity("city", { schema: "computer_shop" })
export class City {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 128 })
  name: string;

  @OneToMany(
    () => UserDeliveryAddress,
    (userDeliveryAddress) => userDeliveryAddress.city,
  )
  userDeliveryAddresses: UserDeliveryAddress[];
}
