import { Body, Request, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponseDto, SuccessResponseDto } from 'src/common/dtos/response.dto';
import { SuccessResponse } from 'src/common/helpers/api-response';
import { CreateUserDto } from 'src/models/user/dto/user.dto';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from './dto/auth.dto';
import { Role } from '../models/role/role.enum';
import { HasRoles } from '../models/role/role.decorator';
import { RolesGuard } from '../models/role/role.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user.' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Register a new user', type: CreateUserDto })
  async registerUser(@Body() inputs: CreateUserDto): Promise<any> {
    const result = await this.auth.register(inputs);
    return new SuccessResponse('User registered successfully.', result);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login user with his email and password.' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Login user in to the system', type: LoginDto })
  async loginUser(@Body() inputs: LoginDto): Promise<any> {
    const result = await this.auth.login(inputs);
    return new SuccessResponse('User logged in successfully.', result);
  }

  @Post('/forgot-password')
  @ApiOperation({ summary: 'Send an email to user to reset his password.' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Forgot password', type: ForgotPasswordDto })
  async forgotPassword(@Body() inputs: ForgotPasswordDto): Promise<any> {
    const result = await this.auth.forgotPassword(inputs);
    return new SuccessResponse('A link has been sent to your email.', result);
  }

  @Post('/reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Reset password', type: ResetPasswordDto })
  async resetPassword(@Body() inputs: ResetPasswordDto): Promise<any> {
    const result = await this.auth.resetPassword(inputs);
    return new SuccessResponse('Reset password successfully.', result);
  }

  @HasRoles(Role.Admin)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  onlyAdmin(@Request() req) {
    return req.user;
  }

  @HasRoles(Role.Employee)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('employee')
  onlyUser(@Request() req) {
    return req.user;
  }
}
