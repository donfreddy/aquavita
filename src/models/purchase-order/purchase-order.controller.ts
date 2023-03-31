import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrder, UpdatePurchaseOrder } from './dto/purchase-order.dto';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('purchase orders')
@Controller('purchase-orders')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrder: PurchaseOrderService) {
  }

  @Post()
  @ApiResponse('',HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new purchase order.' })
  @ApiBody({ description: 'Create a new purchase order', type: CreatePurchaseOrder })
  async createBreakdown(@Body() inputs: CreatePurchaseOrder): Promise<any> {
    return await this.purchaseOrder.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all purchase orders.' })
  async getAllBreakdown(): Promise<any> {
    return await this.purchaseOrder.getAll();
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The purchase order id' })
  @ApiOperation({ summary: 'Update purchase order.' })
  @ApiBody({ description: 'Update purchase order', type: UpdatePurchaseOrder })
  async updateBreakdown(
    @Param('id') purchaseOrderId: string,
    @Body() inputs: UpdatePurchaseOrder,
  ): Promise<any> {
    return await this.purchaseOrder.update(purchaseOrderId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Delete purchase order.' })
  @ApiParam({ name: 'id', description: 'The purchase order id' })
  async deleteTask(@Param('id') purchaseOrderId: string): Promise<any> {
    return await this.purchaseOrder.remove(purchaseOrderId);
  }
}
