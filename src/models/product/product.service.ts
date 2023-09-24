import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entity/product.entity";
import { ILike, In, Repository, UpdateResult } from "typeorm";
import { ProductClientOverviewDto } from "./dto/product-client-overview.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { ProductAdminOverviewDto } from "./dto/product-admin-overview.dto";
import { ProductPrice } from "./model/product-price.model";
import { UnhandledException } from "../../helpers/exception/unhandled.exception";

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

  async getProductsByIds(ids: number[]): Promise<ProductPrice[]> {
    try {
      return (await this.productRepository.find({
        where: { id: In(ids) },
        select: { price: true, id: true },
      })) as ProductPrice[];
    } catch (err) {
      throw new UnhandledException(err.message);
    }
  }

  async decreaseQuantity(
    productId: number,
    amount: number,
  ): Promise<UpdateResult> {
    try {
      return await this.productRepository.decrement(
        { id: productId },
        "quantity",
        amount,
      );
    } catch (err) {
      throw new UnhandledException(err);
    }
  }
}
