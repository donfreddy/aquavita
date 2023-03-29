import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {  SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { BreakdownService } from './breakdown.service';
import { CreatBreakdown, UpdateBreakdown } from './dto/breakdown.dto';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('breakdowns')
@Controller('breakdowns')
export class BreakdownController {
  constructor(private readonly breakdown: BreakdownService) {
  }

  @Post()
  @ApiResponse()
  @ApiOperation({ summary: 'Create a new breakdown.' })
  @ApiBody({ description: 'Create a new breakdown', type: CreatBreakdown })
  async createBreakdown(@Body() inputs: CreatBreakdown): Promise<any> {
    return await this.breakdown.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all breakdowns.' })
  async getAllBreakdown(): Promise<any> {
    return await this.breakdown.getAll();
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The stock id' })
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
