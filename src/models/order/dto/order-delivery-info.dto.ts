import { AutoMap } from "@automapper/classes";

export class OrderDeliveryInfoDto {
  @AutoMap()
  street: string;
  @AutoMap()
  number: string;
  @AutoMap()
  city: string;
  @AutoMap()
  zip: string;
}
