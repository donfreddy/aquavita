import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {  SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { StockService } from './stock.service';
import { CreateStock, UpdateStock } from './dto/stock.dto';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('stocks')
@Controller('stocks')
export class StockController {
  constructor(private readonly stock: StockService) {
  }

  @Post()
  @ApiResponse()
  @ApiOperation({ summary: 'Create a new stock.' })
  @ApiBody({ description: 'Create a new stock', type: CreateStock })
  async createStock(@Body() inputs: CreateStock): Promise<any> {
    return await this.stock.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all stocks.' })
  async getAllStock(): Promise<any> {
    return await this.stock.getAll();
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The stock id' })
  @ApiOperation({ summary: 'Update stock.' })
  @ApiBody({ description: 'Update stock', type: UpdateStock })
  async updateTask(
    @Param('id') stockId: string,
    @Body() inputs: UpdateStock,
  ): Promise<any> {
    return await this.stock.update(stockId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Delete stock.' })
  @ApiParam({ name: 'id', description: 'The stock id' })
  async deleteTask(@Param('id') stockId: string): Promise<any> {
    return await this.stock.remove(stockId);
  }
}
