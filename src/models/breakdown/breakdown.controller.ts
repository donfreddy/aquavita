import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { BreakdownService } from './breakdown.service';
import { CreateBreakdown, UpdateBreakdown } from './dto/breakdown.dto';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('breakdowns')
@Controller('breakdowns')
export class BreakdownController {
  constructor(private readonly breakdown: BreakdownService) {
  }

  @Post()
  @ApiResponse('', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new breakdown.' })
  @ApiBody({ description: 'Create a new breakdown', type: CreateBreakdown })
  async createBreakdown(@Body() inputs: CreateBreakdown): Promise<any> {
    return await this.breakdown.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all breakdowns.' })
  async getAllBreakdown(): Promise<any> {
    return await this.breakdown.getAll();
  }

  @Get('/types')
  @ApiResponse()
  @ApiOperation({ summary: 'Get all breakdown types.' })
  async getAllBreakdownType(): Promise<any> {
    return await this.breakdown.getType();
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The breakdown id' })
  @ApiOperation({ summary: 'Update stock.' })
  @ApiBody({ description: 'Update stock', type: UpdateBreakdown })
  async updateBreakdown(
    @Param('id') stockId: string,
    @Body() inputs: UpdateBreakdown,
  ): Promise<any> {
    return await this.breakdown.update(stockId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Delete breakdown.' })
  @ApiParam({ name: 'id', description: 'The breakdown id' })
  async deleteTask(@Param('id') stockId: string): Promise<any> {
    return await this.breakdown.remove(stockId);
  }
}
