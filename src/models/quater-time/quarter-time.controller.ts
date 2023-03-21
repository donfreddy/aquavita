import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation, ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { getPaginationLimit } from '../../common/helpers';
import { QuarterTimeService } from './quarter-time.service';
import { CreateQuarterTime, CreateQuarterTimePlannings } from './dto/quarter-time.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { SwaggerApiPagedResponse, SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../../common/constants';
import { configService } from '../../config/config.service';

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
    // return new SuccessResponse('Quarter time created successfully.', result);
  }

  @Get()
  @ApiResponse()
  @SwaggerApiPagedResponse()
  @ApiOperation({ summary: 'Get all quarter time.' })
  async getAllQuarterTimes(
    @Query('page', new DefaultValuePipe(DEFAULT_PAGE), ParseIntPipe)
      page: number,
    @Query('limit', new DefaultValuePipe(DEFAULT_LIMIT), ParseIntPipe)
      limit: number,
  ): Promise<any> {
    const route = `${configService.getApiBaseUrl()}/quarter-times`;
    const paginationOptions = {
      page: page,
      limit: getPaginationLimit(limit),
      route: route,
    };
    return await this.quarterTime.getAll(paginationOptions);
    // return new SuccessResponse('Get All quarter time successfully.', result);
  }

  @Post(':id/planning')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The Quarter time id' })
  @ApiOperation({ summary: 'Create a new quarter time planning.' })
  @ApiBody({ description: 'Create a new quarter time planning', type: CreateQuarterTimePlannings })
  async createQuarterTimePlanning( @Param('id') id: string, @Body() inputs: CreateQuarterTimePlannings): Promise<any> {
  return  await this.quarterTime.planQuarterTimeForUser(id, inputs);
    // return new SuccessResponse('Quarter time created successfully.', result);
  }
}
