import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EnumCarboyType } from '../../../common/helpers';

export class CreateCarboyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Entitled',
    required: true,
    example: 'Initial',
  })
  entitled: string;

  @IsEnum(EnumCarboyType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Type',
    required: true,
    example: EnumCarboyType.ENTER,
  })
  type: EnumCarboyType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Quantity',
    required: true,
    example: '12',
  })
  quantity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Date',
    required: true,
    example: '2023-10-03',
  })
  date: Date;
}

export class UpdateCarboyDto extends PartialType(CreateCarboyDto) {
}