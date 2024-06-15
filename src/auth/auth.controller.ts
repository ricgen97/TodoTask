import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
//import { Auth } from "./decorators/auth.decorator";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post()
    @ApiResponse({ status: 200, description: 'Logged successful'})
    @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
    login(@Body() login: LoginDto) {
        return this.authService.login(login);
    }

    // @Auth()
    // @Get('getUser')
    // getUser(@Request() req) {
    //     return req.user
    // }
}