import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as becrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async login(login: LoginDto) {
        const { username, password } = login;
        const user = await this.userRepository.findOne({
            where: { username },
            select: { username: true, password: true, id: true }
        });

        if (!user)
            throw new UnauthorizedException('Credentials invalid')

        if (!becrypt.compareSync(password, user.password))
            throw new UnauthorizedException('Credentials invalid');

        const payload = { id: user.id, username: user.username, name: user.name };
        return {
            token: await this.jwtService.signAsync(payload),
        };
    }
}