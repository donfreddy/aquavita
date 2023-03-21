import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBody, ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SwaggerApiPagedResponse, SwaggerApiResponse } from 'src/common/decorators/swagger-api.decorator';
import { getPaginationLimit } from 'src/common/helpers';
import { ApiResponse } from 'src/common/decorators/response.decorator';
import { configService } from 'src/config/config.service';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from 'src/common/constants';
import { UpdateUserDto } from './dto/user.dto';
import { CreateUserDto } from 'src/models/user/dto/user.dto';
import { UserService } from 'src/models/user/user.service';

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
    return this.user.create(inputs);
  }

  @Get()
  @SwaggerApiPagedResponse()
  @ApiResponse('Get all users successfully.')
  @ApiOperation({ summary: 'Get all users.' })
  async getAllUsers(
    @Query('page', new DefaultValuePipe(DEFAULT_PAGE), ParseIntPipe)
      page: number,
    @Query('limit', new DefaultValuePipe(DEFAULT_LIMIT), ParseIntPipe)
      limit: number,
  ): Promise<any> {
    const route = `${configService.getApiBaseUrl()}/users`;
    const paginationOptions = {
      page: page,
      limit: getPaginationLimit(limit),
      route: route,
    };
    return await this.user.getAll(paginationOptions);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id.' })
  @ApiParam({ name: 'id', description: 'The user id' })
  async getUserById(@Param('id') id: string): Promise<any> {
    return await this.user.get(id);
    // return new SuccessResponse('Get user by id successfully.', result);
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
    // return new SuccessResponse('User updated succ       essfully.', result);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user.' })
  @ApiParam({ name: 'id', description: 'The user id' })
  async deleteUser(@Param('id') id: string): Promise<any> {
    return await this.user.remove(id);
    // return new SuccessResponse('User deleted successfully.', result);
  }
}
                      