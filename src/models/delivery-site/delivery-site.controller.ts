import { Body, Controller, HttpStatus, Get, Post, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { DeliverySiteService } from './delivery-site.service';
import { CreateDeliverySiteDto, UpdateDeliverySiteDto } from './dto/delivery-site.dto';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('delivery sites')
@Controller('delivery-sites')
export class DeliverySiteController {
  constructor(
    private readonly deliverySite: DeliverySiteService,
  ) {
  }

  @Post()
  @ApiResponse('', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new delivery site.' })
  @ApiBody({ description: 'Create a new delivery site', type: CreateDeliverySiteDto })
  async createDeliverySite(@Body() inputs: CreateDeliverySiteDto): Promise<any> {
    return await this.deliverySite.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all delivery sites.' })
  async getAllDeliverySites(): Promise<any> {
    return await this.deliverySite.getAll();
  }

  @Get(':id')
  @ApiResponse()
  @SwaggerApiResponse()
  @ApiParam({ name: 'id', description: 'The delivery site id' })
  @ApiOperation({ summary: 'Get delivery site.' })
  async getDeliverySite(
    @Param('id') deliverySiteId: string,
  ): Promise<any> {
    return await this.deliverySite.get(deliverySiteId);
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The delivery site id' })
  @ApiOperation({ summary: 'Update delivery site.' })
  @ApiBody({ description: 'Update delivery site', type: UpdateDeliverySiteDto })
  async updateDeliverySite(
    @Param('id') deliverySiteId: string,
    @Body() inputs: UpdateDeliverySiteDto,
  ): Promise<any> {
    return await this.deliverySite.update(deliverySiteId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The delivery site id' })
  @ApiOperation({ summary: 'Delete delivery site.' })
  async deleteDeliverySite(
    @Param('id') deliverySiteId: string,
  ): Promise<any> {
    return await this.deliverySite.delete(deliverySiteId);
  }
}