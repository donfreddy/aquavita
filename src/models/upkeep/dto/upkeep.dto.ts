import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EnumBreakdownStatus, EnumUpkeepStatus, EnumUpkeepType } from '../../../common/helpers';

export class CreateUpkeep {
  @IsEnum(EnumUpkeepType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Upkeep type',
    required: false,
    default: EnumUpkeepType.FOUNTAIN,
    example: EnumUpkeepType.FOUNTAIN,
  })
  type: EnumUpkeepType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer id',
    required: true,
    example: '2314hl12hh42j3hl432',
  })
  customer_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The id of the user who maintains',
    required: true,
    example: '2314hl12hh42j3hl432',
  })
  maintained_by_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Next upkeep date',
    required: true,
    example: '2023-12-12',
  })
  next_upkeep: string;


  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Observation',
    required: false,
    example: 'This is an observation',
  })
  observation: string;
}

export class UpdateUpkeep extends PartialType(CreateUpkeep) {
  @IsEnum(EnumBreakdownStatus)
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'upkeep status',
    required: false,
    example: EnumUpkeepStatus.OK,
  })
  status: EnumUpkeepStatus;
}