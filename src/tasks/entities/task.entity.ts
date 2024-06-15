import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";
import { User } from "../../users/entities/user.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column('text')
    @MaxLength(1)
    name: string;

    @ApiProperty()
    @Column('text')
    @MaxLength(1)
    description: string;

    @ApiProperty()
    @Column('timestamp', {default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @ApiProperty()
    @Column('timestamp', { nullable: true })
    updatedDate: Date;

    @ApiProperty()
    @Column('text', { default: "No" })
    done: string;

    @ApiProperty()
    @Column('bool', { default: true })
    isActive: boolean;

    @ManyToOne(
        () => User,
        (user) => user.task
    )
    user: User;


    @BeforeUpdate()
    updateDate() {
        this.updatedDate = new Date
    }

}
