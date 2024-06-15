import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { JwtService } from '@nestjs/jwt';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { User } from '../users/entities/user.entity';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksController', () => {
    let controller: TasksController;
    let tasksService: TasksService;

    const mockTasksService = {
        create: jest.fn(dto => dto),
        findAll: jest.fn((pagination, user) => []),
        findOne: jest.fn((id, user) => null),
        update: jest.fn((id, dto, user) => ({ id, ...dto })),
        remove: jest.fn((id, user) => ({ id })),
        doneTask: jest.fn(id => ({ id })),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [TasksService, JwtService],
        }).overrideProvider(TasksService).useValue(mockTasksService).compile();

        controller = module.get<TasksController>(TasksController);
        tasksService = module.get<TasksService>(TasksService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a task', async () => {
        const mockUser: User = {
            id: "123", 
            username: 'testuser',
            name: 'test',
            password: '1263',
            task: new Task
        };
        const mockRequest = { user: mockUser };

        const createTaskDto: CreateTaskDto = {
            name: 'Test Task',
            description: 'This is a test task',
          };

        const createSpy = jest.spyOn(tasksService, 'create').mockResolvedValue('Created Task');

        await controller.add(createTaskDto, mockRequest);
    
        expect(createSpy).toHaveBeenCalledWith(createTaskDto, mockUser);
    });

    it('should call tasksService.findAll with correct parameters', async () => {
        const paginationDto: PaginationDto = {
          offset: 1,
          limit: 10,
        };
    
        const mockUser: User = {
            id: "123", username: 'testuser',
            name: '',
            password: '',
            task: new Task
        };
        const mockRequest = { user: mockUser };
    
        const findAllSpy = jest.spyOn(tasksService, 'findAll').mockResolvedValue([]);
    
        await controller.getAll(paginationDto, mockRequest);
    
        expect(findAllSpy).toHaveBeenCalledWith(paginationDto, mockUser);
    });

    it('should call tasksService.findOne with correct parameters', async () => {
        const mockId = '123'; 
        const mockUser: User = {
            id: '123', username: 'testuser',
            name: '',
            password: '',
            task: new Task
        };
        const mockRequest = { user: mockUser };
    
        const findOneSpy = jest.spyOn(tasksService, 'findOne').mockResolvedValue(null);
    
        await controller.getById(mockId, mockRequest);
    
        expect(findOneSpy).toHaveBeenCalledWith(mockId, mockUser);
    });

    it('should update a task', async () => {
        const mockUser: User = {
            id: '123', username: 'testuser',
            name: '',
            password: '',
            task: new Task
        };
        const mockRequest = { user: mockUser };
        const mockId = '123';
        const updateTaskDto: UpdateTaskDto = { name: 'Updated Task', description: 'Updated description' };

        const updateSpy = jest.spyOn(tasksService, 'update').mockResolvedValue('Task updated');

        await controller.updateTask(mockId, updateTaskDto, mockRequest);

        expect(updateSpy).toHaveBeenCalledWith(mockId, updateTaskDto, mockUser);
    });

    it('should delete a task', async () => {
        const mockUser: User = {
            id: '123', username: 'testuser',
            name: '',
            password: '',
            task: new Task
        };
        const mockRequest = { user: mockUser };
        const mockId = '123';

        const deleteSpy = jest.spyOn(tasksService, 'remove').mockResolvedValue('task deleted');

        await controller.deleteTask(mockId, mockRequest);

        expect(deleteSpy).toHaveBeenCalledWith(mockId, mockUser);
    });

    it('should mark a task as done', async () => {
        const mockId = '123';

        const doneTaskSpy = jest.spyOn(tasksService, 'doneTask').mockResolvedValue('Task finished');

        await controller.doneTask(mockId);

        expect(doneTaskSpy).toHaveBeenCalledWith(mockId);
    });
});