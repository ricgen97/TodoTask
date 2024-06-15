import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @ApiResponse({ status: 200, description: 'User created' })
    @ApiResponse({ status: 400, description: 'Something went wrong creating the user' })
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}