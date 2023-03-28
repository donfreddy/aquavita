import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/models/user/entities/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ApiResponse } from 'src/common/decorators/response.decorator';
import { SwaggerApiResponse } from 'src/common/decorators/swagger-api.decorator';
import { UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly user: UserService) {
  }

  @Get()
  @ApiResponse('Success')
  @ApiOperation({ summary: 'Get connected user.' })
  async getProfile(@GetUser() currentUser: User): Promise<any> {
    return await this.user.getProfile(currentUser);
  }

  @Put()
  @ApiResponse('Success')
  @ApiOperation({ summary: 'Update user profile.' })
  @ApiBody({ description: 'Update user profile', type: UpdateUserDto })
  async updateUser(
    @GetUser() currentUser: User,
    @Body() inputs: UpdateUserDto,
  ): Promise<any> {
    return await this.user.updateProfile(currentUser, inputs);
  }
}
