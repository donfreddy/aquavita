import { Body, Controller, HttpStatus, Get, Post, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { FountainService } from './fountain.service';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SwaggerApiResponse } from 'src/common/decorators/swagger-api.decorator';
import { CreateFountain, UpdateFountain } from './dto/fountain.dto';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('fountains')
@Controller('fountains')
export class FountainController {
  constructor(private readonly fountain: FountainService) {
  }

  @Post()
  @ApiResponse('', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new fountain.' })
  @ApiBody({ description: 'Create a new fountain', type: CreateFountain })
  async createBreakdown(@Body() inputs: CreateFountain): Promise<any> {
    return await this.fountain.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all fountains.' })
  async getAllBreakdown(): Promise<any> {
    return await this.fountain.getAll();
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The fountain id' })
  @ApiOperation({ summary: 'Update fountain.' })
  @ApiBody({ description: 'Update fountain', type: UpdateFountain })
  async updateBreakdown(
    @Param('id') fountainId: string,
    @Body() inputs: UpdateFountain,
  ): Promise<any> {
    return await this.fountain.update(fountainId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The fountain id' })
  @ApiOperation({ summary: 'Delete fountain.' })
  async deleteBreakdown(
    @Param('id') fountainId: string,
  ): Promise<any> {
    return await this.fountain.delete(fountainId);
  }
}

