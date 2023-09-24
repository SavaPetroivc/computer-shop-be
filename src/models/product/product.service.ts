import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entity/product.entity";
import { ILike, Repository } from "typeorm";
import { ProductClientOverviewDto } from "./dto/product-client-overview.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { ProductAlreadyExistsException } from "./exceptions/product-already-exists.exception";
import { ProductAdminOverviewDto } from "./dto/product-admin-overview.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async getProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAllForClientOverview(): Promise<ProductClientOverviewDto[]> {
    try {
      const products: Product[] = await this.getProducts();
      return this.classMapper.mapArray(
        products,
        Product,
        ProductClientOverviewDto,
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async createProduct(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async findProductByName(name: string): Promise<Product> {
    try {
      return await this.productRepository.findOne({
        where: { name: ILike(name) },
      });
    } catch (err) {
      throw new Error();
    }
  }

  async getProductsForAdministrators(): Promise<ProductAdminOverviewDto[]> {
    try {
      const products: Product[] = await this.getProducts();
      return this.classMapper.mapArray(
        products,
        Product,
        ProductAdminOverviewDto,
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteProduct(id: number) {
    return await this.productRepository.delete({ id });
  }
}
