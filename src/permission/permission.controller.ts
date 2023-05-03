import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { ApiResponse } from 'src/common/decorators/response.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/models/user/entities/user.entity';
import { Permission } from './types/permission.type';
import { SwaggerApiResponse } from 'src/common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('permissions')
@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permission: PermissionService) {}

  @Get()
  @ApiResponse('Success')
  @SwaggerApiResponse()
  @ApiOperation({ summary: 'Return the permissions of the current user' })
  async getPermissions(@GetUser() user: User): Promise<Permission[]> {
    const { permissions } = await this.permission.getPermissions(user);
    return permissions;
  }
}
