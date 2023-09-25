import { AutoMap } from "@automapper/classes";

export class MeUserInfoDto {
  @AutoMap()
  username: string;
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  role: string;
  @AutoMap()
  activated: boolean;
}
