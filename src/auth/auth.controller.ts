import { Body, Request, Controller, Get, Post, UseGuards, Res } from '@nestjs/common';
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
import { Response } from 'express';
import { ApiResponse } from '../common/decorators/response.decorator';
import { SwaggerApiResponse } from '../common/decorators/swagger-api.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {
  }

  @Post('/register')
  @ApiResponse()
  @ApiOperation({ summary: 'Register a new user.' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiInternalServerErrorResponse({ type: ErrorResponseDto })
  @ApiBody({ description: 'Register a new user', type: CreateUserDto })
  async registerUser(@Res() res: Response, @Body() inputs: CreateUserDto): Promise<any> {
    return await this.auth.register(res, inputs);
  }

  @Post('/login')
  @SwaggerApiResponse()
  @ApiOperation({ summary: 'Login user with his email and password.' })
  @ApiBody({ description: 'Login user in to the system', type: LoginDto })
  async loginUser(@Body() inputs: LoginDto): Promise<any> {
    return await this.auth.login(inputs);
  }

  @Post('/forgot-password')
  @ApiOperation({ summary: 'Send an email to user to reset his password.' })
  @SwaggerApiResponse()
  @ApiBody({ description: 'Forgot password', type: ForgotPasswordDto })
  async forgotPassword(@Body() inputs: ForgotPasswordDto): Promise<any> {
    const result = await this.auth.forgotPassword(inputs);
    return new SuccessResponse('A link has been sent to your email.', result);
  }

  @Post('/reset-password')
  @SwaggerApiResponse()
  @ApiOperation({ summary: 'Reset user password' })
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
    return new SuccessResponse('Success', req.user);
  }

  @HasRoles(Role.User)
  @ApiResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  onlyUser(@Request() req) {
    return req.user;
  }
}
