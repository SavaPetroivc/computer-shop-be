import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleName } from "../enums/role-name.enum";
import { User } from "../../user/entities/user.entity";
import { AutoMap } from "@automapper/classes";

@Entity("role", { schema: "computer_shop" })
export class Role {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @AutoMap()
  @Column("enum", {
    name: "role",
    enum: RoleName,
  })
  role: RoleName;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
