import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderCreateDto } from "./dto/order-create.dto";
import { RoleName } from "../role/enums/role-name.enum";
import { Roles } from "../../core/decorators/roles.decorator";
import { JwtGuard } from "../../core/guards/jwt/jwt.guard";
import { RoleGuard } from "../../core/guards/jwt/role.guard";
import { UserService } from "../user/services/user.service";
import { Authorization } from "../../helpers/decorators/authorization.decorator";
import { JwtService } from "@nestjs/jwt";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { Order } from "./entities/order.entity";
import { Response } from "express";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { OrderByIdDto } from "./dto/order-by-id.dto";
import { SelfGuard } from "../../core/guards/jwt/self.guard";

@ApiTags("orders")
@Controller("orders")
export class OrderController {
  constructor(
    @InjectMapper() private readonly classMapper: Mapper,
    private readonly orderService: OrderService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Post("")
  @Roles([RoleName.USER])
  @UseGuards(JwtGuard, RoleGuard)
  async createOrder(
    @Body() createOrderDto: OrderCreateDto,
    @Authorization() jwt: string,
    @Res() res: Response,
  ) {
    const jwtBody: any = this.jwtService.decode(jwt);
    const currentUser = await this.userService.findUserByUsername(
      jwtBody.username,
    );
    const order = this.classMapper.map(createOrderDto, OrderCreateDto, Order);
    order.user = currentUser;

    await this.orderService.createOrder(order);
    res.sendStatus(HttpStatus.OK);
  }

  @Get("most-popular")
  async getMostPopularProducts(@Param() id: number) {
    return await this.orderService.getMostPopularProducts();
  }

  @Get("")
  @ApiOkResponse({ type: [OrderByIdDto] })
  @Roles([RoleName.ADMINISTRATOR, RoleName.WAREHOUSE_ADMINISTRATOR])
  @UseGuards(JwtGuard, RoleGuard)
  async getOrders() {
    return await this.orderService.getOrders();
  }

  @Get("me")
  @ApiOkResponse({ type: [OrderByIdDto] })
  @UseGuards(JwtGuard)
  async getOrdersMe(@Authorization() jwt: string) {
    const jwtBody = this.jwtService.decode(jwt);

    const currentUser = await this.userService.findUserByUsername(
      jwtBody["username"],
    );
    return await this.orderService.getOrdersByUser(currentUser.id);
  }
}
