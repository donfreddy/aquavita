import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SwaggerApiResponse } from 'src/common/decorators/swagger-api.decorator';
import { DepartmentService } from './department.service';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('department')
@Controller('department')
@Controller()
export class DepartmentController {
  constructor(private readonly dartment: DepartmentService) {
  }
}
