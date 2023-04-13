import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwaggerApiResponse } from '../../common/decorators/swagger-api.decorator';
import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PayslipService } from './payslip.service';

@ApiBearerAuth()
@SwaggerApiResponse()
@UseGuards(JwtAuthGuard)
@ApiTags('payslips')
@Controller('payslips')
export class PayslipController {
  constructor(
    private readonly payslip: PayslipService,
  ) {
  }


}