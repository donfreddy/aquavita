import { Body, Controller, HttpStatus, Get, Post, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto, UpdateContractDto } from './dto/contract.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('contracts')
@Controller('contracts')
export class ContractController {
  constructor(
    private readonly contract: ContractService,
  ) {
  }

  @Post()
  @ApiResponse('', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new contract.' })
  @ApiBody({ description: 'Create a new contract', type: CreateContractDto })
  async createContract(@Body() inputs: CreateContractDto): Promise<any> {
    return await this.contract.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all contracts.' })
  async getAllContract(): Promise<any> {
    return await this.contract.getAll();
  }

  @Get(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The contract id' })
  @ApiOperation({ summary: 'Get contract by Id' })
  async getContract(
    @Param('id') contractId: string,
  ): Promise<any> {
    return await this.contract.get(contractId);
  }

  @Put(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The contract id' })
  @ApiOperation({ summary: 'Update contract.' })
  @ApiBody({ description: 'Update contract', type: UpdateContractDto })
  async updateContract(
    @Param('id') contractId: string,
    @Body() inputs: UpdateContractDto,
  ): Promise<any> {
    return await this.contract.update(contractId, inputs);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiParam({ name: 'id', description: 'The contract id' })
  @ApiOperation({ summary: 'Delete customer.' })
  async deleteContract(
    @Param('id') contractId: string,
  ): Promise<any> {
    return await this.contract.delete(contractId);
  }
}
