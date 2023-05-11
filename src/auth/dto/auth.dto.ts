import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'johndoe@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ type: 'string', example: 'Password@123' })
  password: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'johndoe@gmail.com',
  })
  email: string;
}


export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The otp code sent to the user',
    example: '499696',
  })
  readonly otp_code: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The user id',
    example: '',
  })
  readonly user_id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: 'The new password',
    example: '@Password#1234',
  })
  password: string;
}

export class CheckOtpDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'The otp code sent to the user',
    example: '123456',
  })
  readonly otp_code: string;
}
