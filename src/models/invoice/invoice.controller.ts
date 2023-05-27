import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto/invoice.dto';
import { EnumEmployeeType, EnumInvoiceStatus } from '../../common/helpers';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoice: InvoiceService) {
  }

  @Post()
  @ApiResponse(null, HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new invoice.' })
  @ApiBody({ description: 'Create a new invoice', type: CreateInvoiceDto })
  async createInvoice(@Body() inputs: CreateInvoiceDto): Promise<any> {
    return await this.invoice.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiQuery({
    name: 'status',
    description: 'Invoice status',
    enum: EnumInvoiceStatus,
    required: false,
  })
  @ApiOperation({ summary: 'Get all invoice.' })
  async getAllInvoices(
    @Query('type') invoiceStatus: EnumInvoiceStatus,
  ): Promise<any> {
    return await this.invoice.getAll(invoiceStatus);
  }

  @Get()
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The invoice id' })
  @ApiOperation({ summary: 'Get invoice.' })
  async getInvoice(@Param('id') invoiceId: string): Promise<any> {
    return await this.invoice.get(invoiceId);
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The invoice id' })
  @ApiOperation({ summary: 'Update invoice.' })
  @ApiBody({ description: 'Update invoice', type: UpdateInvoiceDto })
  async updateInvoice(
    @Param('id') stockId: string,
    @Body() inputs: UpdateInvoiceDto,
  ): Promise<any> {
    return await this.invoice.update(stockId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Delete invoice.' })
  @ApiParam({ name: 'id', description: 'The invoice id' })
  async deleteInvoice(@Param('id') stockId: string): Promise<any> {
    return await this.invoice.remove(stockId);
  }
}
