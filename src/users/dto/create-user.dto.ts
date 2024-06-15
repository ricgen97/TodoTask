import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty()
    @IsString()
    username:string;

    @ApiProperty()
    @IsString()
    name:string;
    
    @ApiProperty()
    @IsString()
    password:string;
}