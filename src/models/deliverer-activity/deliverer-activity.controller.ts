import { Body, Controller, HttpStatus, Get, Post, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { DelivererActivityService } from './deliverer-activity.service';
import { CreateDelivererActivityDto, UpdateDelivererActivityDto } from './dto/deliverer-activity.dto';
import { CreateDeliverySlipDto, UpdateDeliverySlipDto } from './dto/delivery-slip.dto';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('deliverer activities')
@Controller('deliverer-activities')
export class DelivererActivityController {
  constructor(
    private readonly delivererActivity: DelivererActivityService,
  ) {
  }

  @Post()
  @ApiResponse('', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new deliverer activity report.' })
  @ApiBody({ description: 'Create a new deliverer activity report', type: CreateDelivererActivityDto })
  async createDelivererActivity(@Body() inputs: CreateDelivererActivityDto): Promise<any> {
    return await this.delivererActivity.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all deliverer activity reports.' })
  async getAllDelivererActivities(): Promise<any> {
    return await this.delivererActivity.getAll();
  }

  @Get(':id')
  @ApiResponse()
  @SwaggerApiResponse()
  @ApiParam({ name: 'id', description: 'The deliverer activity report id' })
  @ApiOperation({ summary: 'Get deliverer activity report.' })
  async getDelivererActivity(
    @Param('id') delivererActivityId: string,
  ): Promise<any> {
    return await this.delivererActivity.get(delivererActivityId);
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The deliverer activity report id' })
  @ApiOperation({ summary: 'Update deliverer activity report.' })
  @ApiBody({ description: 'Update deliverer activity report', type: UpdateDelivererActivityDto })
  async updateDelivererActivity(
    @Param('id') delivererActivityId: string,
    @Body() inputs: UpdateDelivererActivityDto,
  ): Promise<any> {
    return await this.delivererActivity.update(delivererActivityId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The deliverer activity report id' })
  @ApiOperation({ summary: 'Delete deliverer activity report.' })
  async deleteDelivererActivity(
    @Param('id') delivererActivityId: string,
  ): Promise<any> {
    return await this.delivererActivity.delete(delivererActivityId);
  }

  @Post('/:id/delivery-slips')
  @ApiResponse('', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new delivery slip.' })
  @ApiBody({ description: 'Create a new delivery slip', type: CreateDeliverySlipDto })
  async createDeliverySlip(
    @Param('id') delivererActivityId: string,
    @Body() inputs: CreateDeliverySlipDto,
  ): Promise<any> {
    return await this.delivererActivity.createDelivererSlip(delivererActivityId, inputs);
  }

  @Get('/:id/delivery-slips')
  @ApiResponse()
  @ApiOperation({ summary: 'Get all delivery slips.' })
  async getAllDeliverySlips(
    @Param('id') delivererActivityId: string,
  ): Promise<any> {
    return await this.delivererActivity.getAllDelivererSlips(delivererActivityId);
  }

  @Get('/:id/delivery-slips/:delivery_slip_id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The deliverer activity report id' })
  @ApiParam({ name: 'delivery_slip_id', description: 'The delivery slip id' })
  @ApiOperation({ summary: 'Get delivery slip.' })
  async getDeliverySlip(
    @Param('id') delivererActivityId: string,
    @Param('delivery_slip_id') deliverySlipId: string,
  ): Promise<any> {
    return await this.delivererActivity.getDelivererSlip(delivererActivityId, deliverySlipId);
  }

  @Put('/:id/delivery-slips/:delivery_slip_id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The deliverer activity report id' })
  @ApiParam({ name: 'delivery_slip_id', description: 'The delivery slip id' })
  @ApiOperation({ summary: 'Update delivery slip.' })
  @ApiBody({ description: 'Update delivery slip', type: UpdateDeliverySlipDto })
  async updateDeliverySlip(
    @Param('id') delivererActivityId: string,
    @Param('delivery_slip_id') deliverySlipId: string,
    @Body() inputs: UpdateDeliverySlipDto,
  ): Promise<any> {
    return await this.delivererActivity.updateDelivererSlip(delivererActivityId, deliverySlipId, inputs);
  }

  @Delete('/:id/delivery-slips/:delivery_slip_id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The deliverer activity report id' })
  @ApiParam({ name: 'delivery_slip_id', description: 'The delivery slip id' })
  @ApiOperation({ summary: 'Delete delivery slip.' })
  async deleteDeliverySlip(
    @Param('id') delivererActivityId: string,
    @Param('delivery_slip_id') deliverySlipId: string,
  ): Promise<any> {
    return await this.delivererActivity.deleteDelivererSlip(delivererActivityId, deliverySlipId);
  }
}