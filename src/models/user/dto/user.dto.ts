import {
  IsEmail, IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { EnumEmployeeType } from '../../../common/helpers';
import { PermissionRole } from '../../../permission/enum/permission.enum';

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
  @IsOptional()
  @MinLength(8)
  @ApiProperty({ type: 'string', example: 'Password@123', required: false })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'string', example: '', required: false })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'string', example: 'Manutentionnaire', required: false })
  job: string;

  @IsEnum(PermissionRole)
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Set user role',
    required: false,
    default: PermissionRole.SIMPLE_USER,
    example: PermissionRole.SIMPLE_USER,
  })
  role: PermissionRole;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Hiring date',
    required: false,
    example: '2020-10-01',
  })
  hiring_date: string;

  @IsEnum(EnumEmployeeType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Employee type',
    required: true,
    example: EnumEmployeeType.PRODUCTION,
  })
  employee_type: EnumEmployeeType;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'string', example: 'Douala', required: false })
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'string', example: 'Bonaberi', required: false })
  neighborhood: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
}
