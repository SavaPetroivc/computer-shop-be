import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { City } from "../../city/entity/city.entity";
import { Repository } from "typeorm";
import { RoleService } from "../../role/role.service";
import { RoleName } from "../../role/enums/role-name.enum";
import { UserAlreadyExistsException } from "../exceptions/user-already-exists.exception";
import { FindOptionsRelations } from "typeorm/find-options/FindOptionsRelations";
import { UnhandledException } from "../../../helpers/exception/unhandled.exception";
import { UserOverviewDto } from "../dto/user-overview.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { hashSync } from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectMapper() private readonly classMapper: Mapper,
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
      throw new UnhandledException(err);
    }
  }
  async findUserById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (err) {
      throw new UnhandledException(err);
    }
  }

  async getUsers(): Promise<UserOverviewDto[]> {
    try {
      const users = await this.userRepository.find({
        relations: { role: true, userContactInfo: { city: true } },
      });
      return this.classMapper.mapArray(users, User, UserOverviewDto);
    } catch (er) {
      throw new UnhandledException(er);
    }
  }

  async updateUser(user: User, currentUser: User) {
    try {
      user.id = currentUser.id;
      user.userContactInfo.id = currentUser.userContactInfo.id;

      await this.userRepository.save(user);
    } catch (err) {
      throw new UnhandledException(err);
    }
  }
  async updateProfile(
    username: string,
    data: {
      firstName: string;
      lastName: string;
      userContactInfo: {
        email: string;
        contactPhone: string;
        street?: string;
        number?: string;
        zip?: string;
        city?: { id: string | number } | null;
      };
    },
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: { userContactInfo: true },
    });
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.userContactInfo.email = data.userContactInfo.email;
    user.userContactInfo.contactPhone = data.userContactInfo.contactPhone;
    user.userContactInfo.street = data.userContactInfo.street;
    user.userContactInfo.number = data.userContactInfo.number;
    user.userContactInfo.zip = data.userContactInfo.zip;
    user.userContactInfo.city = data.userContactInfo.city?.id
      ? ({ id: data.userContactInfo.city.id } as City)
      : (null as unknown as City);
    await this.userRepository.save(user);
  }

  async setNewPassword(username: string, password: string): Promise<void> {
    const currentUser = await this.findUserByUsername(username);
    await this.userRepository.update(currentUser.id, {
      password: hashSync(password, 10),
      activated: true,
    });
  }
}
