import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { filterTaskDto } from './dto/get-task-filter.dto';
import { updateTaskStatusDto } from './dto/update-task-status.dto';
import { AuthGuard } from '@nestjs/passport'
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterTaskDto: filterTaskDto,
    @GetUser() user: User
    ): Promise<Task[]> {
    return this.tasksService.getTasks(filterTaskDto, user)
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, user: User): Promise<Task> {
    return this.tasksService.getTaskById(id,user)
  }

  @Post()
  createTask(
    @Body() createTaskDto: createTaskDto,
    @GetUser() user: User
    ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user)
  }

  @Delete('/:id')
  deleteTask(@Param("id") id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id,user)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: updateTaskStatusDto,
    @GetUser() user: User
  ): Promise<Task> {
    const { status } = updateTaskStatusDto
    return this.tasksService.updateTaskStatus(id, status, user)
  }
}
