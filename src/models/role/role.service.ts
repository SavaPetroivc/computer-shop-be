import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./entity/role.entity";
import { RoleName } from "./enums/role-name.enum";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async getRoleByName(role: RoleName): Promise<Role> {
    try {
      return await this.roleRepository.findOne({ where: { role } });
    } catch (err) {
      throw new Error(err);
    }
  }
}
