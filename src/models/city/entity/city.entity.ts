import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserDeliveryAddress } from "../../user/entities/user-delivery-address.entity";
import { OrderDeliveryInfo } from "../../order-delivery-info/entity/order-delivery-info.entity";
import { AutoMap } from "@automapper/classes";

@Entity("city", { schema: "computer_shop" })
export class City {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @AutoMap()
  @Column("varchar", { name: "name", length: 128 })
  name: string;

  @OneToMany(
    () => UserDeliveryAddress,
    (userDeliveryAddress) => userDeliveryAddress.city,
  )
  userDeliveryAddresses: UserDeliveryAddress[];

  @OneToMany(
    () => OrderDeliveryInfo,
    (orderDeliveryInfo) => orderDeliveryInfo.city,
  )
  orderDeliveryInfos: OrderDeliveryInfo[];
}
