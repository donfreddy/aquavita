import { CreateTaskDto } from './dto/task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { UserService } from '../user/user.service';
import { QuarterPlanning } from '../../common/entities/quarter-planning.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    @InjectRepository(UserQuarterPlanning)
    private readonly userQuarterTimeRepo: Repository<UserQuarterPlanning>,
    @InjectRepository(QuarterPlanning)
    private readonly quarterPlanningRepo: Repository<QuarterPlanning>,
    private readonly : UserService,
  ) {
  }

  // Create a new task
  async create(inputs: CreateTaskDto): Promise<Task> {
    const quarterPlanning = await this.quarterPlanningRepo.findOneBy({
      id: inputs.quarter_time_id
    });
    const userPlaning = await this.userQuarterTimeRepo.findOneBy({
      id: inputs.user_id
    });

    const newTask = new Task();
    newTask.title = inputs.title;
    if (inputs.description) newTask.description = inputs.description;
    newTask.due_date = newTask.due_date ?  new Date(inputs.due_date) : new Date();
    newTask.quarter_planning = quarterPlanning;
    newTask.user_planning = userPlaning;

    return this.taskRepo
      .save(newTask)
      .then((entity) => this.getWhere('id', (entity as Task).id));
  }

  async get(taskId: string): Promise<Task> {
    return this.getWhere('id', taskId, ['user_planning.user', 'quarter_planning.quarter']);
  }

  async getAll(): Promise<Task[]> {
    return this.taskRepo.find({ relations: ['user_planning.user', 'quarter_planning.quarter'] });
  }

  async update(taskId: string, inputs: DeepPartial<CreateTaskDto>) {
    const foundTask = await this.getWhere('id', taskId);

    if (inputs.title) foundTask.title = inputs.title;
    if (inputs.description) foundTask.description = inputs.description;
    if (inputs.due_date) foundTask.due_date = new Date(inputs.due_date);
    if (inputs.status) foundTask.status = inputs.status;
    if (inputs.user_id) {
      const userPlaning = await this.userQuarterTimeRepo.findOneBy({
        id: inputs.user_id
      });
      foundTask.user_planning = userPlaning;
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
    return this.taskRepo.findOne({ where: { [key]: value }, relations }).then((task) => {
      if (!task && throwsException) {
        return Promise.reject(
          new NotFoundException(`No task found with ${key} ${value}`),
        );
      }
      return Promise.resolve(task ? task : null);
    });
  }
}
