import { AutoMap } from "@automapper/classes";
import { UserOrderCreatedDto } from "../../user/dto/user-order-created.dto";

export class OrderByIdDto {
  @AutoMap()
  id: number;
  @AutoMap()
  date: number;
  @AutoMap()
  total: number;
  @AutoMap(() => UserOrderCreatedDto)
  user: UserOrderCreatedDto;
}
