import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Role } from '../../role/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'John', required: true })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Doe', required: true })
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  @ApiProperty({ type: 'string', example: 'johndoe@gmail.com', required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ type: 'string', example: 'Password@123', required: true })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'string', example: '', required: false })
  phone: string;

  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'enum', enum: Role, example: [Role.Employee] })
  roles: Role[];
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'John', required: true })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Doe', required: true })
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  @ApiProperty({ type: 'string', example: 'johndoe@gmail.com', required: true })
  email: string;
}