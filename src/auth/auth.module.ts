import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./guards/auth-guard.guard";

@Module({
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    global: true,
                    secret: process.env.SECRET_JWT,
                    signOptions: { expiresIn: '2H' },
                }
            }
        })
    ],
    exports: [AuthGuard, JwtModule]
})
export class AuthModule { }