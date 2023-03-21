import { CreateTaskDto } from './dto/task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    private readonly userService: UserService,
  ) {
  }

  // Create a new task
  async create(inputs: CreateTaskDto): Promise<Task> {
    const user = await this.userService.getWhere('id', inputs.user_id, [], false);

    const newTask = new Task();
    newTask.title = inputs.title;
    if (inputs.description) newTask.description = inputs.description;
    if (newTask.status) newTask.status = inputs.status;
    if (newTask.due_date) newTask.due_date = new Date(inputs.due_date);
    newTask.user = user ? user : null;

    return this.taskRepo
      .save(inputs)
      .then((entity) => this.getWhere('id', (entity as Task).id));
  }

  async get(taskId: string): Promise<Task> {
    return this.getWhere('id', taskId,['user']);
  }

  async getAll(options: IPaginationOptions): Promise<Pagination<Task>> {
    return paginate<Task>(this.taskRepo, options);
  }

  async update(taskId: string, inputs: DeepPartial<CreateTaskDto>) {
    const foundTask = await this.getWhere('id', taskId);

    if (inputs.title) foundTask.title = inputs.title;
    if (inputs.description) foundTask.description = inputs.description;
    if (inputs.due_date) foundTask.due_date = new Date(inputs.due_date);
    if (inputs.status) foundTask.status = inputs.status;
    if (inputs.user_id) {
      foundTask.user = await this.userService.getWhere('id', inputs.user_id);
    }

    await this.taskRepo.save(foundTask);
    return { updated: true };
  }

  async remove(taskId: string) {
    const foundTask = await this.getWhere('id', taskId);
    await this.taskRepo.softDelete(foundTask.id);
    return { deleted: true };
  }

  async getWhere(
    key: keyof Task,
    value: any,
    relations = [],
    throwsException = true,
  ): Promise<Task | null> {
    return this.taskRepo.findOne({ where: { [key]: value },relations }).then((task) => {
      if (!task && throwsException) {
        return Promise.reject(
          new NotFoundException(`No task found with ${key} ${value}`),
        );
      }
      return Promise.resolve(task ? task : null);
    });
  }
}
