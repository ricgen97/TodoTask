import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';

@ApiTags('Tasks')
@Auth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Something went wrong creating the task' })
  @Post('addTask')
  add(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get success', type: [Task] })
  @ApiResponse({ status: 400, description: 'Something went wrong getting tasks' })
  @Get('getAll')
  getAll(@Query() pagination: PaginationDto, @Req() req) {
    return this.tasksService.findAll(pagination, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get success', type: Task })
  @ApiResponse({ status: 400, description: 'Something went wrong getting the task' })
  @Get('getById/:id')
  getById(@Param('id') id: string, @Req() req) {
    return this.tasksService.findOne(id, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Task updated', type: Task })
  @ApiResponse({ status: 400, description: 'Something went wrong updating the task' })
  @Patch('updateTask/:id')
  updateTask(@Param('id', ParseUUIDPipe) id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req) {
    return this.tasksService.update(id, updateTaskDto, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Task deleted' })
  @ApiResponse({ status: 400, description: 'Something went wrong deleting the task' })
  @Delete('deleteTask/:id')
  deleteTask(@Param('id') id: string, @Req() req) {
    return this.tasksService.remove(id, req.user);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Task completed' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Patch('doneTask/:id')
  doneTask(@Param('id') id: string, @Req() req) {
    return this.tasksService.doneTask(id, req.user);
  }
}
