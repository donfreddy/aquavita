import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SwaggerApiPagedResponse, SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../common/constants';
import { configService } from '../../config/config.service';
import { getPaginationLimit } from '../../common/helpers';
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

    //
    return await this.task.get(id);
    // return new SuccessResponse('Get task by id successfully.', result);
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
    //  return new SuccessResponse('User updated successfully.', result);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Delete task.' })
  @ApiParam({ name: 'id', description: 'The task id' })
  async deleteTask(@Param('id') id: string): Promise<any> {
    return await this.task.remove(id);
    // return new SuccessResponse('Task deleted successfully.', result);
  }
}