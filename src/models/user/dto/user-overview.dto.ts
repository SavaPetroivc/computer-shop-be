import { AutoMap } from "@automapper/classes";

export class UserOverviewDto {
  @AutoMap()
  id: number;
  @AutoMap()
  firstName: string;
  @AutoMap()
  lastName: string;
  @AutoMap()
  username: string;
}
