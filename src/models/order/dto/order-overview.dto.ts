import {AutoMap} from "@automapper/classes";

export class OrderOverviewDto{
    @AutoMap()
    id:number
    @AutoMap()
    date: number;
    @AutoMap()
    total: number;
}
