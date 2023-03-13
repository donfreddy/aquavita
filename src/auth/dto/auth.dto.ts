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
  @MinLength(6)
  @ApiProperty({
    description: 'The token sent to the user',
    example: '4f546b55258a10288c7e2865051d1252b2a69823f8cd1c65144c696',
  })
  readonly token: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The user id',
    example: 34,
  })
  readonly user_id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: 'The new password',
    example: '@Password#1234',
  })
  password: string;
}


