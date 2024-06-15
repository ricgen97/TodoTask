import { Task } from "../../tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', unique: true })
    username: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    password: string;

    @OneToMany(
        () => Task,
        (tasks) => tasks.user,
    )
    task: Task
}