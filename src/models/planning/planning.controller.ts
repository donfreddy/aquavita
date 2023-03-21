import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PlanningService } from './planning.service';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { ApiResponse } from '../../common/decorators/response.decorator';

@ApiBearerAuth()
 // @ApiResponse()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('planning')
@Controller('planning')
export class PlanningController {
  constructor(
    private readonly planningService: PlanningService,
  ) {
  }

  @Get()
  getPlanning() {
    return this.planningService.getAll();
  }
}
