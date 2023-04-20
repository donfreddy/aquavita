import { Body, Controller, HttpStatus, Get, Post, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { CreatePresenceDto } from './dto/presence.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../../common/decorators/response.decorator';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('presences')
@Controller('presences')
export class PresenceController {
  constructor(
    private readonly presence: PresenceService,
  ) {
  }

  @Post()
  @ApiResponse('', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new presence.' })
  @ApiBody({ description: 'Create a new presence', type: CreatePresenceDto })
  async createPresence(@Body() inputs: CreatePresenceDto): Promise<any> {
    return await this.presence.create(inputs);
  }

  @Get()
  @ApiResponse()
  @ApiOperation({ summary: 'Get all presences.' })
  async getAllPresences(): Promise<any> {
    return await this.presence.getAll();
  }

  @Put(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Update presence.' })
  async updatePresence(
    @Param('id') presenceId: string,
  ): Promise<any> {
    return await this.presence.updateArchiveStatus(presenceId);
  }

  @Delete(':id')
  @ApiResponse()
  @ApiOperation({ summary: 'Delete presence.' })
  async deleteCarboy(
    @Param('id') presenceId: string,
  ): Promise<any> {
    return await this.presence.delete(presenceId);
  }
}
