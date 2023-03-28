import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/models/user/dto/user.dto';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from './dto/auth.dto';
import { Response } from 'express';
import { ApiResponse } from '../common/decorators/response.decorator';
import { SwaggerApiResponse } from '../common/decorators/swagger-api.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {
  }

  @Post('/register')
  @ApiResponse('Success', HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user.' })
  @SwaggerApiResponse()
  @ApiBody({ description: 'Register a new user', type: CreateUserDto })
  async registerUser( @Body() inputs: CreateUserDto): Promise<any> {
    return await this.auth.register(inputs);
  }

  @Post('/login')
  @ApiResponse('Success')
  @SwaggerApiResponse()
  @ApiOperation({ summary: 'Login user with his email and password.' })
  @ApiBody({ description: 'Login user in to the system', type: LoginDto })
  async loginUser(@Body() inputs: LoginDto): Promise<any> {
    return await this.auth.login(inputs);
  }

  @Post('/forgot-password')
  @ApiResponse('Success')
  @ApiResponse('A link has been sent to your email.')
  @ApiOperation({ summary: 'Send an email to user to reset his password.' })
  @SwaggerApiResponse()
  @ApiBody({ description: 'Forgot password', type: ForgotPasswordDto })
  async forgotPassword(@Body() inputs: ForgotPasswordDto): Promise<any> {
    return await this.auth.forgotPassword(inputs);
  }

  @Post('/reset-password')
  @ApiResponse('Reset password successfully.')
  @SwaggerApiResponse()
  @ApiOperation({ summary: 'Reset user password' })
  @ApiBody({ description: 'Reset password', type: ResetPasswordDto })
  async resetPassword(@Body() inputs: ResetPasswordDto): Promise<any> {
    return await this.auth.resetPassword(inputs);
  }
}
