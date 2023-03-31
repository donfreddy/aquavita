import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EnumBreakdownStatus } from '../../../common/helpers';

export class CreateBreakdown {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Breakdown name',
    required: true,
    example: 'Panne moteur',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Breakdown description',
    required: true,
    example: 'Some description',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Breakdown tracking time',
    required: true,
    example: '',
  })
  tracking_time: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'breakdown type',
    required: true,
    example: 'Roulement',
  })
  type: string;
}

export class UpdateBreakdown {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Breakdown name',
    required: false,
    example: 'Panne moteur',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Breakdown description',
    required: false,
    example: 'Some description',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Breakdown tracking time',
    required: false,
    example: '',
  })
  tracking_time: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'breakdown type',
    required: false,
    example: 'Roulement',
  })
  type: string;

  @IsEnum(EnumBreakdownStatus)
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'breakdown status',
    required: false,
    example: EnumBreakdownStatus.DECLARED,
  })
  status: EnumBreakdownStatus;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: '',
    required: false,
    example: '2314hl12hh42j3hl432',
  })
  user_id: string;
}