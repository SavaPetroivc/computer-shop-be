import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("user_contact_info", { schema: "computer_shop" })
export class UserContactInfo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "email", length: 128 })
  email: string;

  @Column("varchar", { name: "contact_phone", length: 128 })
  contactPhone: string;

  @OneToMany(() => User, (user) => user.userContactInfo)
  users: User[];
}
