import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto, UpdatePurchaseDto } from './dto/purchase.dto';
import { ApiResponse } from '../../common/decorators/response.decorator';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('purchases')
@Controller('purchases')
export class PurchaseController {
  constructor(
    private readonly purchase: PurchaseService,
  ) {
  }

  @Post()
  @ApiResponse('', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new purchase.' })
  @ApiBody({ description: 'Create a new purchase', type: CreatePurchaseDto })
  async createBreakdown(@Body() inputs: CreatePurchaseDto): Promise<any> {
    return await this.purchase.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all purchases.' })
  async getAllBreakdown(): Promise<any> {
    return await this.purchase.getAll();
  }

  @Put(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Update purchase.' })
  @ApiBody({ description: 'Update purchase', type: UpdatePurchaseDto })
  async updateBreakdown(
    @Param('id') purchaseId: string,
    @Body() inputs: UpdatePurchaseDto,
  ): Promise<any> {
    return await this.purchase.update(purchaseId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Delete purchase.' })
  async deleteBreakdown(
    @Param('id') purchaseId: string,
  ): Promise<any> {
    return await this.purchase.delete(purchaseId);
  }
}
