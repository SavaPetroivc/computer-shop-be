import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    () => OrderDeliveryInfo,
    (orderDeliveryInfo) => orderDeliveryInfo.city,
  )
  orderDeliveryInfos: OrderDeliveryInfo[];
}
