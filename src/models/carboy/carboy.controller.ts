import { Body, Controller, HttpStatus, Get, Post, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { CarboyService } from './carboy.service';
import { CreateCarboyDto, UpdateCarboyDto } from './dto/carboy.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('carboys')
@Controller('carboys')
export class CarboyController {
  constructor(
    private readonly carboy: CarboyService,
  ) {
  }

  @Post()
  @ApiResponse('', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new carboy.' })
  @ApiBody({ description: 'Create a new carboy', type: CreateCarboyDto })
  async createCarboy(@Body() inputs: CreateCarboyDto): Promise<any> {
    return await this.carboy.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all carboys.' })
  async getAllCarboys(): Promise<any> {
    return await this.carboy.getAll();
  }

  @Put(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Update carboy.' })
  @ApiBody({ description: 'Update carboy', type: UpdateCarboyDto })
  async updateCarboy(
    @Param('id') carboyId: string,
    @Body() inputs: UpdateCarboyDto,
  ): Promise<any> {
    return await this.carboy.update(carboyId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Delete carboy.' })
  async deleteCarboy(
    @Param('id') carboyId: string,
  ): Promise<any> {
    return await this.carboy.delete(carboyId);
  }
}
