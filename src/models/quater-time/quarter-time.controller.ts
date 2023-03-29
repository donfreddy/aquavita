import {
  Body,
  Controller, DefaultValuePipe,
  Delete,
  Get, Param,
  Post, Put, Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation, ApiParam, ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { QuarterTimeService } from './quarter-time.service';
import { CreateQuarterTime, CreateQuarterTimePlannings, UpdateQuarterTime } from './dto/quarter-time.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { SwaggerApiPagedResponse, SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { ApiResponse } from '../../common/decorators/response.decorator';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('quarter-times')
@Controller('quarter-times')
export class QuarterTimeController {
  constructor(private readonly quarterTime: QuarterTimeService) {
  }

  @Post()
  @ApiResponse()
  @ApiOperation({ summary: 'Create a new quarter time.' })
  @ApiBody({ description: 'Create a new quarter time', type: CreateQuarterTime })
  async createQuarterTime(@Body() inputs: CreateQuarterTime): Promise<any> {
    return await this.quarterTime.create(inputs);
  }

  @Get()
  @ApiResponse()
  @SwaggerApiPagedResponse()
  @ApiOperation({ summary: 'Get all quarter time.' })
  async getAllQuarterTimes(): Promise<any> {
    return await this.quarterTime.getAll();
  }

  @Get("unplanned")
  @ApiResponse()
  @SwaggerApiPagedResponse()
  @ApiOperation({ summary: 'Get all unplanned quarter time.' })
  async getAllUnplannedQuarterTimes(): Promise<any> {
    return await this.quarterTime.getAllUnplanned();
  }


  @Put(':id')
  @ApiResponse()
  @SwaggerApiPagedResponse()
  @ApiParam({ name: 'id', description: 'The quarter time id' })
  @ApiOperation({ summary: 'Update quarter time.' })
  @ApiBody({ description: 'Update quarter time', type: UpdateQuarterTime })
  async updateTask(
    @Param('id') id: string,
    @Body() inputs: UpdateQuarterTime,
  ): Promise<any> {
    return await this.quarterTime.update(id, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Delete quarter time.' })
  @ApiParam({ name: 'id', description: 'The quarter time id' })
  async deleteTask(@Param('id') quarterTimeId: string): Promise<any> {
    return await this.quarterTime.remove(quarterTimeId);
  }

  @Post(':id/planning')
  @ApiResponse('Success')
  @ApiParam({ name: 'id', description: 'The Quarter time id' })
  @ApiOperation({ summary: 'Create a new quarter time planning.' })
  @ApiBody({ description: 'Create a new quarter time planning', type: CreateQuarterTimePlannings })
  async createQuarterTimePlanning(@Param('id') id: string, @Body() inputs: CreateQuarterTimePlannings): Promise<any> {
    return await this.quarterTime.planQuarterTimeForUser(id, inputs);
  }

  @Get(':id/planning')
  @ApiResponse('Success')
  @ApiQuery({ name: 'start_date', required: false, example: 'love' })
  @ApiQuery({ name: 'end_date', type: String, required: false, example: 'love' })
  @ApiParam({ name: 'id', description: 'The Quarter time id' })
  @ApiOperation({ summary: 'Get  quarter time planning.' })
  async getQuarterTimePlanning(
    @Param('id') quarterTimeId: string,
    @Query('start_date', new DefaultValuePipe('')) startDate: string,
    @Query('end_date') endDate: string,
  ): Promise<any> {
    return await this.quarterTime.getQuarterTimePlanning(quarterTimeId, startDate, endDate);
  }
}
