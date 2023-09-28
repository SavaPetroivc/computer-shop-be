import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserContactInfo } from "./user-contact-info.entity";
import { Role } from "../../role/entity/role.entity";
import { AutoMap } from "@automapper/classes";
import { UserContactInfoCreateDto } from "../dto/user-contact-info.create.dto";
import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";
import * as bcrypt from "bcrypt";
import { Order } from "../../order/entities/order.entity";
import { UserContactInfoGetDto } from "../dto/user-contact-info-get.dto";
import { RoleInUserOverviewDto } from "../../role/dto/role-in-user-overview.dto";
@Index("UQ_78a916df40e02a9deb1c4b75edb", ["username"], { unique: true })
@Entity("user", { schema: "computer_shop" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @AutoMap()
  @Column("varchar", { name: "username", unique: true, length: 128 })
  username: string;

  @AutoMap()
  @Column("varchar", { name: "password", length: 128 })
  password: string;

  @AutoMap()
  @Column("varchar", { name: "first_name", length: 128 })
  firstName: string;

  @AutoMap()
  @Column("varchar", { name: "last_name", length: 128 })
  lastName: string;

  @AutoMap(() => UserContactInfoCreateDto)
  @AutoMap(() => UserContactInfoGetDto)
  @ManyToOne(
    () => UserContactInfo,
    (userContactInfo) => userContactInfo.users,
    { onDelete: "CASCADE", onUpdate: "RESTRICT", cascade: true },
  )
  @JoinColumn([{ name: "user_contact_info_id", referencedColumnName: "id" }])
  userContactInfo: UserContactInfo;

  @AutoMap(() => BasicFkDto)
  @AutoMap(() => RoleInUserOverviewDto)
  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Role;

  @AutoMap()
  @Column({ name: "activated", type: "boolean" })
  activated: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @BeforeInsert()
  private hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }


}
