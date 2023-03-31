import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SwaggerApiPagedResponse, SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly task: TaskService) {
  }

  @Post()
  @ApiResponse()
  @ApiOperation({ summary: 'Create a new task.' })
  @ApiBody({ description: 'Create a new task', type: CreateTaskDto })
  async createTask(@Body() inputs: CreateTaskDto): Promise<any> {
    return this.task.create(inputs);
  }

  @Get()
  @ApiResponse('Get all tasks successfully.')
  @ApiOperation({ summary: 'Get all tasks.' })
  async getAllTasks(): Promise<any> {
    return await this.task.getAll();
  }

  @Get(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The task id' })
  @ApiOperation({ summary: 'Get task by id.' })
  async getTaskById(@Param('id') id: string): Promise<any> {
    return await this.task.get(id);
  }

  @Put(':id')
  @ApiResponse()
  @SwaggerApiPagedResponse()
  @ApiParam({ name: 'id', description: 'The task id' })
  @ApiOperation({ summary: 'Update task.' })
  @ApiBody({ description: 'Update task', type: UpdateTaskDto })
  async updateTask(
    @Param('id') id: string,
    @Body() inputs: UpdateTaskDto,
  ): Promise<any> {
    return await this.task.update(id, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Delete task.' })
  @ApiParam({ name: 'id', description: 'The task id' })
  async deleteTask(@Param('id') id: string): Promise<any> {
    return await this.task.remove(id);
  }
}