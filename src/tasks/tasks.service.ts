import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {

  private readonly logger = new Logger('TasksService');

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) { }

  async create(createTaskDto: CreateTaskDto, user: User) {
    try {
      const task = this.taskRepository.create({
        ...createTaskDto,
        user
      });
      await this.taskRepository.save(task);
      return 'Task created';

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(pagination: PaginationDto, user: User) {
    const { limit = 10, offset = 0 } = pagination;
    try {
      return await this.taskRepository.find({
        take: limit,
        skip: offset,
        where: { user, isActive: true }
      });
    } catch (error) {
      this.handleExceptions(error);
    }

  }

  async findOne(id: string, user: User) {
    try {
      return await this.taskRepository.findOne({
        where: { id, user, isActive: true }
      });
    } catch (error) {

      this.handleExceptions(error);

    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user: User) {

    try {

      const confim = await this.taskRepository.findOne({ where: { id, user } })

      this.handleUserTask(confim)

      const task = await this.taskRepository.preload({
        id,
        ...updateTaskDto,
      });

      if (!task)
        throw new BadRequestException('Error updating the task');

      await this.taskRepository.save(task);
      return 'Task updated';

    } catch (error) {
      this.handleExceptions(error);

    }
  }

  async remove(id: string, user: User) {
    try {
      const task = await this.taskRepository.findOne({ where: { id, user } })

      this.handleUserTask(task)

      task.isActive = true;
      await this.taskRepository.preload({
        id,
        ...task
      });
      this.taskRepository.save(task);
      return 'task deleted';
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async doneTask(id: string, user: User) {
    try {
      const task = await this.taskRepository.findOne({ where: { id, user } })
      this.handleUserTask(task)
      task.done = 'Yes',
        await this.taskRepository.preload({
          id,
          ...task
        });
      this.taskRepository.save(task);
      return 'Task finished';
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleUserTask(task: Task) {
    if (!task) this.handleExceptions('This task does not exist or does not belong to this user');
  }

  private handleExceptions(error: any) {
    this.logger.error(error);
    throw new BadRequestException(error);
  }
}
