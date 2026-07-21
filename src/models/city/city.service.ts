import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { City } from "./entity/city.entity";
import { Repository } from "typeorm";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}

  async getCities(): Promise<City[]> {
    return await this.cityRepository.find();
  }
}
