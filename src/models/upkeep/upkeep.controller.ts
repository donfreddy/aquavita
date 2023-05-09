import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { UpkeepService } from './upkeep.service';
import { CreateUpkeep, UpdateUpkeep } from './dto/upkeep.dto';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('upkeep')
@Controller('upkeep')
export class UpkeepController {
  constructor(private readonly upkeep: UpkeepService) {
  }

  @Post()
  @ApiResponse('', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new upkeep.' })
  @ApiBody({ description: 'Create a new upkeep', type: CreateUpkeep })
  async createUpkeep(@Body() inputs: CreateUpkeep): Promise<any> {
    return await this.upkeep.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all upkeep.' })
  async getAllUpkeep(): Promise<any> {
    return await this.upkeep.getAll();
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The upkeep id' })
  @ApiOperation({ summary: 'Update upkeep.' })
  @ApiBody({ description: 'Update upkeep', type: UpdateUpkeep })
  async updateUpkeep(
    @Param('id') stockId: string,
    @Body() inputs: UpdateUpkeep,
  ): Promise<any> {
    return await this.upkeep.update(stockId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Delete upkeep.' })
  @ApiParam({ name: 'id', description: 'The upkeep id' })
  async deleteUpkeep(@Param('id') stockId: string): Promise<any> {
    return await this.upkeep.remove(stockId);
  }
}
