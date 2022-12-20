import { EntityRepository, Repository } from 'typeorm'
import { Task } from './task.entity';
import { createTaskDto } from './dto/create-task.dto';
import { STATUS } from './task-status.enum';
import { filterTaskDto } from './dto/get-task-filter.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

    async getTasks(filterTaskDto: filterTaskDto, user: User): Promise<Task[]> {
        const query = this.createQueryBuilder('task')
        query.where({ user })

        const { search, status } = filterTaskDto;

        if(status){
          query.andWhere(`task.status = :status`, {status});
        }

        if(search){
          query.andWhere(`(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))`,
          { search: `%${search}%`})
        }

        const tasks = await query.getMany()
        return tasks
    }

    async createTask(createTaskDto: createTaskDto, user: User): Promise<Task> {
        const {title, description} = createTaskDto;
    
        const task = this.create({
          title,
          description,
          status: STATUS.OPEN,
          user
        })
    
        await this.save(task);
        return task
      }
}