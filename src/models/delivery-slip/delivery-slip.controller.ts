import { Body, Controller, HttpStatus, Get, Post, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { DeliverySlipService } from './delivery-slip.service';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { CreateDeliverySlipDto, UpdateDeliverySlipDto } from './dto/delivery-slip.dto';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('delivery slips')
@Controller('delivery-slips')
export class DeliverySlipController {
  constructor(
    private readonly deliverySlip: DeliverySlipService,
  ) {
  }

  @Post()
  @ApiResponse('', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new delivery slip.' })
  @ApiBody({ description: 'Create a new delivery slip', type: CreateDeliverySlipDto })
  async createDeliverySlip(@Body() inputs: CreateDeliverySlipDto): Promise<any> {
    return await this.deliverySlip.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all delivery slips.' })
  async getAllDeliverySlips(): Promise<any> {
    return await this.deliverySlip.getAll();
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The delivery slip id' })
  @ApiOperation({ summary: 'Update delivery slip.' })
  @ApiBody({ description: 'Update delivery slip', type: UpdateDeliverySlipDto })
  async updateDeliverySlip(
    @Param('id') materialId: string,
    @Body() inputs: UpdateDeliverySlipDto,
  ): Promise<any> {
    return await this.deliverySlip.update(materialId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The delivery slip id' })
  @ApiOperation({ summary: 'Delete delivery slip.' })
  async deleteDeliverySlip(
    @Param('id') materialId: string,
  ): Promise<any> {
    return await this.deliverySlip.delete(materialId);
  }
}