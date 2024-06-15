import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateTaskDto {
    @ApiProperty()
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    description: string;
}
