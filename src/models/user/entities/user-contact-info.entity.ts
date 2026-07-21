import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { AutoMap } from "@automapper/classes";
import { City } from "../../city/entity/city.entity";
import { CityDto } from "../../city/dto/city.dto";

@Entity("user_contact_info", { schema: "computer_shop" })
export class UserContactInfo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @AutoMap()
  @Column("varchar", { name: "email", length: 128 })
  email: string;

  @AutoMap()
  @Column("varchar", { name: "contact_phone", length: 128 })
  contactPhone: string;

  @AutoMap()
  @Column("varchar", { name: "street", length: 128, nullable: true })
  street: string;

  @AutoMap()
  @Column("varchar", { name: "number", length: 128, nullable: true })
  number: string;

  @AutoMap()
  @Column("varchar", { name: "zip", length: 128, nullable: true })
  zip: string;

  @AutoMap(() => CityDto)
  @ManyToOne(() => City, {
    onDelete: "SET NULL",
    onUpdate: "RESTRICT",
    nullable: true,
  })
  @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
  city: City;

  @OneToMany(() => User, (user) => user.userContactInfo)
  users: User[];
}
