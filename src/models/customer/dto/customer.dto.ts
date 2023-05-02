import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EnumCustomerType } from '../../../common/helpers';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer name',
    required: true,
    example: 'ENEO Division Technique',
  })
  name: string;

  @IsEnum(EnumCustomerType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer type',
    required: true,
    example: EnumCustomerType.CONTRACT,
  })
  type: EnumCustomerType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer address',
    required: true,
    example: 'Ndokotti',
  })
  address: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Number of carboy per week',
    required: false,
    example: '20',
  })
  carboys_per_week: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
}