import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PlanningService } from './planning.service';
import { SwaggerApiPagedResponse, SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { UpdateStock } from '../stock/dto/stock.dto';
import { UpdateQuarterPlanning, UpdateQuarterTimePlannings } from '../quater-time/dto/quarter-time.dto';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('planning')
@Controller('planning')
export class PlanningController {
  constructor(
    private readonly planningService: PlanningService,
  ) {
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all planning.' })
  getALlPlanning() {
    return this.planningService.getAll();
  }

  @Get(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The planning id' })
  @ApiOperation({ summary: 'Get planning.' })
  async getPlanning(
    @Param('id') planningId: string,
  ): Promise<any> {
    return await this.planningService.get(planningId);
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The planning id' })
  @ApiOperation({ summary: 'Update planning.' })
  @ApiBody({ description: 'Update planning', type: UpdateQuarterPlanning })
  async updatePlanning(
    @Param('id') planningId: string,
    @Body() inputs: UpdateQuarterPlanning,
  ): Promise<any> {
    return await this.planningService.update(planningId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Delete planning.' })
  @ApiParam({ name: 'id', description: 'The planning id' })
  async deletePlanning(@Param('id') planningId: string): Promise<any> {
    return await this.planningService.remove(planningId);
  }
}
