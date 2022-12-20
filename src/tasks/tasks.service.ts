import { Injectable } from '@nestjs/common';
import { STATUS } from './task-status.enum';
import { createTaskDto } from './dto/create-task.dto';
import { filterTaskDto } from './dto/get-task-filter.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm'
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTasks(filterTaskDto: filterTaskDto, user: User): Promise<Task[]> {
    return await this.tasksRepository.getTasks(filterTaskDto, user)
  }

  async getTaskById(id: string, user : User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: {id, user}});

    if(!found){
      throw new NotFoundException(`Couldn't Found The Given ID ${id}`)
    }

    return found
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user})
    if(result.affected === 0){
      throw new NotFoundException(`Couldn't Delete The Given ID ${id}`)
    }
  }

  async createTask(createTaskDto: createTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user)
  }

  async updateTaskStatus(id: string, status: STATUS, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status
    await this.tasksRepository.save(task)
    return task
  }
}
