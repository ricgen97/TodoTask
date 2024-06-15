import { CreateUserDto } from "./dto/create-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as becrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Logger } from "@nestjs/common";

export class UsersService {

    private readonly logger = new Logger('UsersService');

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async create(createUserDto: CreateUserDto) {
        try {
            const { password, ...userData } = createUserDto;

            const user = this.userRepository.create({
                ...userData,
                password: becrypt.hashSync(password, 10)
            });

            await this.userRepository.save(user);

            return 'User Added';

        } catch (error) {
            this.handleExceptions(error)
        }

    }

    private handleExceptions(error: any) {
        this.logger.error(error);
        throw new BadRequestException();
    }

} 