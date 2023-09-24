import { AutoMap } from "@automapper/classes";
import { BasicFkDto } from "../../../helpers/dto/basic-fk-dto";

export class UserDeliveryAddressCreateDto {
  @AutoMap()
  street: string;
  @AutoMap()
  zip: string;
  @AutoMap()
  number: string;
  @AutoMap(() => BasicFkDto)
  city: BasicFkDto;
  @AutoMap(() => BasicFkDto)
  user: BasicFkDto;
}
