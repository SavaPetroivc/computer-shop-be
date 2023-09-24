import {
  Body,
  Controller,
  HttpStatus,
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
import { ApiTags } from "@nestjs/swagger";

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

    res.send(await this.orderService.createOrder(order));
  }
}
