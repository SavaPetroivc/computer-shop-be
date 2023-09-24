import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Response } from "express";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { ProductClientOverviewDto } from "./dto/product-client-overview.dto";
import { JwtGuard } from "../../core/guards/jwt/jwt.guard";
import { RoleGuard } from "../../core/guards/jwt/role.guard";
import { Roles } from "../../core/decorators/roles.decorator";
import { RoleName } from "../role/enums/role-name.enum";
import { ProductCreateDto } from "./dto/product-create.dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Product } from "./entity/product.entity";
import { ProductUpdateDto } from "./dto/product-update.dto";
import { ProductAdminOverviewDto } from "./dto/product-admin-overview.dto";

@ApiTags("products")
@Controller("products")
export class ProductController {
  constructor(
    @InjectMapper() private readonly classMapper: Mapper,
    private readonly productService: ProductService,
  ) {}

  @Get("")
  @ApiOkResponse({ type: [ProductClientOverviewDto] })
  async getOverviewProducts(@Res() res: Response) {
    try {
      res.send(await this.productService.getAllForClientOverview());
    } catch ({ message }) {
      return { message };
    }
  }

  @Post("")
  @UseGuards(JwtGuard, RoleGuard)
  @Roles([RoleName.ADMINISTRATOR, RoleName.WAREHOUSE_ADMINISTRATOR])
  createProduct(@Body() createProductDto: ProductCreateDto) {
    const product = this.classMapper.map(
      createProductDto,
      ProductCreateDto,
      Product,
    );
    return this.productService.createProduct(product);
  }

  @Put("")
  @UseGuards(JwtGuard, RoleGuard)
  @Roles([RoleName.ADMINISTRATOR, RoleName.WAREHOUSE_ADMINISTRATOR])
  updateProduct(@Body() updateProductDto: ProductUpdateDto) {
    const product = this.classMapper.map(
      updateProductDto,
      ProductUpdateDto,
      Product,
    );
    return this.productService.createProduct(product);
  }

  @Get("administrators")
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOkResponse({ type: [ProductAdminOverviewDto] })
  @Roles([RoleName.ADMINISTRATOR, RoleName.WAREHOUSE_ADMINISTRATOR])
  getProductsForAdministrators() {
    return this.productService.getProductsForAdministrators();
  }

  @Delete(":id")
  @ApiParam({ name: "id", type: "number"  })
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOkResponse({ type: "string" })
  @Roles([RoleName.ADMINISTRATOR])
  async deleteProduct(@Param() id: number, @Res() res: Response) {
    await this.productService.deleteProduct(id);
    res.sendStatus(HttpStatus.OK);
  }
}
