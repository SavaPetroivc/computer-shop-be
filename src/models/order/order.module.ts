import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { UserModule } from "../user/user.module";
import { ProductModule } from "../product/product.module";
import { OrderProfile } from "./profile/order.profile";

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UserModule, ProductModule],
  controllers: [OrderController],
  providers: [OrderService, OrderProfile],
})
export class OrderModule {}
