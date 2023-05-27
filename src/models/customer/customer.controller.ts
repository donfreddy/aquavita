import { Body, Controller, HttpStatus, Get, Post, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customer: CustomerService,
  ) {
  }

  @Post()
  @ApiResponse('', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new customer.' })
  @ApiBody({ description: 'Create a new customer', type: CreateCustomerDto })
  async createCustomer(@Body() inputs: CreateCustomerDto): Promise<any> {
    return await this.customer.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all customers.' })
  async getAllCustomer(): Promise<any> {
    return await this.customer.getAll();
  }


  @Get('/sold')
  @ApiResponse()
  @ApiOperation({ summary: 'Get customers sold.' })
  async getCustomersSold(): Promise<any> {
    return await this.customer.getAllSold();
  }

  @Get(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The customer id' })
  @ApiOperation({ summary: 'Get customer by Id' })
  async getCustomer(
    @Param('id') customerId: string,
  ): Promise<any> {
    return await this.customer.get(customerId);
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The customer id' })
  @ApiOperation({ summary: 'Update customer.' })
  @ApiBody({ description: 'Update customer', type: UpdateCustomerDto })
  async updateCustomer(
    @Param('id') customerId: string,
    @Body() inputs: UpdateCustomerDto,
  ): Promise<any> {
    return await this.customer.update(customerId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The customer id' })
  @ApiOperation({ summary: 'Delete customer.' })
  async deleteCustomer(
    @Param('id') customerId: string,
  ): Promise<any> {
    return await this.customer.delete(customerId);
  }

  @Get('/:id/delivery-sites')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The customer delivery sites' })
  @ApiOperation({ summary: 'Get customer delivery sites.' })
  async getCustomerDeliverySites(
    @Param('id') customerId: string,
  ): Promise<any> {
    return await this.customer.getDeliverySites(customerId);
  }

  @Get('/:id/sold')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The customer sold' })
  @ApiOperation({ summary: 'Get customer sold.' })
  async getCustomerSold(
    @Param('id') customerId: string,
  ): Promise<any> {
    return await this.customer.getSold(customerId);
  }
}
