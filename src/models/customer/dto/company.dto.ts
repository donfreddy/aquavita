import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCompanyDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Year of creation',
    required: false,
    example: '2011',
  })
  year_of_creation: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Effective',
    required: false,
    default: 0,
    example: 5,
  })
  effective: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Responsible',
    required: false,
    example: 'John Doe 2',
  })
  responsible: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Company activity',
    required: false,
    example: 'Some activity',
  })
  activity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Taxpayer number',
    required: true,
    example: 'P123456789',
  })
  taxpayer_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Trade register number',
    required: true,
    example: 'TR123456789',
  })
  trade_register_number: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Opening time',
    required: false,
    example: '2021-08-01 08:00:00',
  })
  opening_time: Date;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Pause time start',
    required: false,
    example: '2021-08-01 12:00:00',
  })
  pause_time_start: Date;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Pause time end',
    required: false,
    example: '2021-08-01 14:00:00',
  })
  pause_time_end: Date;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Closing time',
    required: false,
    example: '2021-08-01 18:00:00',
  })
  closing_time: Date;
}

export class UpdateAddressDto extends PartialType(CreateCompanyDto) {
}