import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { RoleService } from "../../role/role.service";
import { RoleName } from "../../role/enums/role-name.enum";
import { UserAlreadyExistsException } from "../exceptions/user-already-exists.exception";
import { FindOptionsRelations } from "typeorm/find-options/FindOptionsRelations";
import { use } from "passport";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async save(user: User): Promise<User> {
    const potentialExistsUser = await this.findUserByUsername(user.username);
    if (potentialExistsUser) {
      throw new UserAlreadyExistsException();
    }

    return await this.userRepository.save(user);
  }

  findUserByUsername(username: string, relations?: FindOptionsRelations<User>) {
    try {
      return this.userRepository.findOne({ where: { username }, relations });
    } catch (err) {
      throw Error(err);
    }
  }
  async findUserById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateUser(user: User, currentUser: User) {
    try {
      user.userContactInfo.id = currentUser.id;
      user.id = currentUser.id;

      await this.userRepository.save(user);
    } catch (err) {
      throw Error(err);
    }
  }
}
