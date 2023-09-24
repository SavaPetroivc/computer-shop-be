import {AutoMap} from "@automapper/classes";
import {ApiProperty} from "@nestjs/swagger";

export class ProductCreateDto{
    @AutoMap()
    @ApiProperty()
    name:string;
    @AutoMap()
    @ApiProperty()
    price:number
    @AutoMap()
    @ApiProperty()
    quantity:number
}
