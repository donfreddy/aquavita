import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBody, ApiBearerAuth, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SwaggerApiResponse } from 'src/common/decorators/swagger-api.decorator';
import { ApiResponse } from 'src/common/decorators/response.decorator';
import { UpdateUserDto } from './dto/user.dto';
import { CreateUserDto } from 'src/models/user/dto/user.dto';
import { UserService } from 'src/models/user/user.service';
import { EnumEmployeeType } from '../../common/helpers';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly user: UserService) {
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiBody({ description: 'Create a new user', type: CreateUserDto })
  async createUser(@Body() inputs: CreateUserDto): Promise<any> {
    return this.user.create(inputs, false);
  }

  @Get()
  @ApiResponse('Get all users successfully.')
  @ApiOperation({ summary: 'Get all users.' })
  @ApiQuery({
    name: 'type',
    description: 'The employee type',
    enum: EnumEmployeeType,
    required: false,
  })
  async getAllUsers(
    @Query('type') employeeType: EnumEmployeeType,
  ): Promise<any> {
    return await this.user.getAll(employeeType);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id.' })
  @ApiParam({ name: 'id', description: 'The user id' })
  async getUserById(@Param('id') id: string): Promise<any> {
    return await this.user.get(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user.' })
  @ApiParam({ name: 'id', description: 'The task id' })
  @ApiBody({ description: 'Update user', type: UpdateUserDto })
  async updateUser(
    @Param('id') id: string,
    @Body() inputs: UpdateUserDto,
  ): Promise<any> {
    return await this.user.update(id, inputs);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user.' })
  @ApiParam({ name: 'id', description: 'The user id' })
  async deleteUser(@Param('id') id: string): Promise<any> {
    return await this.user.remove(id);
  }
}
                      