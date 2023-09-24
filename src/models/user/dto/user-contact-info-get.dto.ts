import { AutoMap } from "@automapper/classes";

export class UserContactInfoGetDto {
  @AutoMap()
  email: string;
  @AutoMap()
  contactPhone: string;
}
