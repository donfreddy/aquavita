import { Body, Controller, HttpStatus, Get, Post, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { MaterialService } from './material.service';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { CreateMaterialDto, UpdateMaterialDto } from './dto/material.dto';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('materials')
@Controller('materials')
export class MaterialController {
  constructor(
    private readonly material: MaterialService,
  ) {
  }

  @Post()
  @ApiResponse('', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new material.' })
  @ApiBody({ description: 'Create a new material', type: CreateMaterialDto })
  async createMaterial(@Body() inputs: CreateMaterialDto): Promise<any> {
    return await this.material.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all materials.' })
  async getAllMaterials(): Promise<any> {
    return await this.material.getAll();
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The material id' })
  @ApiOperation({ summary: 'Update material.' })
  @ApiBody({ description: 'Update material', type: UpdateMaterialDto })
  async updateMaterial(
    @Param('id') materialId: string,
    @Body() inputs: CreateMaterialDto,
  ): Promise<any> {
    return await this.material.update(materialId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The material id' })
  @ApiOperation({ summary: 'Delete material.' })
  async deleteMaterial(
    @Param('id') materialId: string,
  ): Promise<any> {
    return await this.material.delete(materialId);
  }
}