import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entity/product.entity";
import { Repository } from "typeorm";
import { ProductClientOverviewDto } from "./dto/product-client-overview.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async getAllForClientOverview(): Promise<ProductClientOverviewDto[]> {
    try {
      const products: Product[] = await this.productRepository.find();
      return this.classMapper.mapArray(
        products,
        Product,
        ProductClientOverviewDto,
      );
    } catch (err) {
      throw new Error(err);
    }
  }
}
